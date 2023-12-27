import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ListGroup,
    Button,
    Row,
    Col,
    Image,
    Card,
    Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loading from '../components/Loading';
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: payPalError,
    } = useGetPaypalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth);

    // Load paypal script
    useEffect(() => {
        if (!payPalError && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, payPalError, paypalDispatch, loadingPayPal]);

    // Paypal button functions
    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch(); // change not paid to paid
                toast.success('Payment Successful');
            } catch (error) {
                toast.error('An error occurred. Please try again.');
            }
        });
    }
    function onError(err) {
        toast.error(err.message);
    }
    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: order.totalPrice,
                        },
                    },
                ],
            })
            .then((orderId) => {
                return orderId;
            });
    }

    // Test button for development
    // async function onApproveTest() {
    //     await payOrder({ orderId, details: { payer: {} } });
    //     refetch(); // change not paid to paid
    //     toast.success('Payment Successful');
    // }

    return isLoading ? (
        <Loading />
    ) : error ? (
        <Message variant='danger' />
    ) : (
        <>
            <h5 className='kalnia-l'>
                <strong>Order #</strong> {order._id}
            </h5>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        {/* Order shipping confirmation */}
                        <ListGroup.Item className='bg-black text kalnia-r'>
                            <h3>Shipping</h3>
                            <p className='kalnia-l'>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p className='kalnia-l'>
                                <strong>Email: </strong> {order.user.email}
                            </p>
                            <p className='kalnia-l'>
                                <strong>Address: </strong>{' '}
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {/* Delivered */}
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on: {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroup.Item>
                        {/* Payment */}
                        <ListGroup.Item className='bg-black text kalnia-r'>
                            <h3>Payment Method</h3>
                            <p className='kalnia-l'>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {/* Paid */}
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on: {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        {/* Order Items */}
                        <ListGroup.Item className='bg-black text kalnia-r'>
                            <h3>Order Items</h3>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className='bg-black text kalnia-r'
                                >
                                    <Row>
                                        <Col md={1}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                            />
                                        </Col>
                                        <Col>
                                            <Link
                                                className='link product-link'
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = $
                                            {item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* Order Summary */}
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Order Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* Pay order Button*/}
                            {!order.isPaid && (
                                <ListGroup.Item className='bg-black text kalnia-r'>
                                    {loadingPay && <Loading />}
                                    {isPending ? (
                                        <Loading />
                                    ) : (
                                        <div>
                                             {/* Test button for development */}
                                            {/* <Button
                                                onClick={onApproveTest}
                                                style={{ marginBottom: '10px' }}
                                            >
                                                Test Pay Order
                                            </Button> */}
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}
                            {/* Mark as delivered */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
