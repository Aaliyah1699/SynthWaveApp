import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ListGroup, Button, Row, Col, Image, Card } from 'react-bootstrap';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loading from '../components/Loading';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();
    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            console.log('Order Placed Successfully:', res);
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            console.error('Error placing order:', err);
            toast.error(
                'An error occurred while placing the order. Please try again.'
            );
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                {/* Shipping, Pay, Order*/}
                <Col md={8}>
                    <ListGroup variant='flush'>
                        {/* Shipping */}
                        <ListGroup.Item className='bg-black text kalnia-r'>
                            <h3>Shipping:</h3>
                            <p className='kalnia-l'>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        {/* Payment */}
                        <ListGroup.Item className='bg-black text kalnia-r'>
                            <h3>Payment Method:</h3>
                            <p className='kalnia-l'>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        {/* Order */}
                        <ListGroup.Item className='bg-black text kalnia-r'>
                            <h3>Order:</h3>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                // Order list
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                                                        // rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        className='link product-link'
                                                        to={`/products/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col
                                                    md={4}
                                                    className='kalnia-l'
                                                >
                                                    {item.qty} x ${item.price} =
                                                    ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* Order Summary */}
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <h3>Order Summary:</h3>
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <Row>
                                    <Col>Items Price:</Col>
                                    <Col className='kalnia-l'>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col className='kalnia-l'>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col className='kalnia-l'>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col className='kalnia-l'>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {/* Error Message */}
                            <ListGroup.Item className='bg-black text kalnia-r'>
                                {error && (
                                    <Message variant='danger'>{error}</Message>
                                )}
                            </ListGroup.Item>
                            {/* Button */}
                            <ListGroup.Item className='bg-black text kalnia-l'>
                                <Button
                                    type='button'
                                    className='btn-block bg-dark btn-hover border-0 kalnia-l'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                                {isLoading && <Loading />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
