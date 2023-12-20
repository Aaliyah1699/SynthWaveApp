import { useNavigate, Link } from 'react-router-dom';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { GrTrash } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Row>
            <Col md={8} className='kalnia-m'>
                <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='danger'>
                        Your cart is empty.{' '}
                        <Link
                            to='/'
                            className='product-link'
                            style={{ textDecoration: 'underline' }}
                        >
                            Go Back
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id} className='bg-black'>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link
                                            to={`/product/${item._id}`}
                                            className='link neon-pink-hover'
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2} style={{ color: 'white' }}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        {' '}
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            className='bg-black text-white kalnia-r'
                                            onChange={(e) =>
                                                addToCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            className='bg-black border-0'
                                            onClick={() =>
                                                removeFromCartHandler(item._id)
                                            }
                                        >
                                            <GrTrash className='neon-pink neon-hover' />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} className='kalnia-m'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4 className='kalnia-l'>
                                Subtotal:{' '}
                                <span className='kalnia-m'>
                                    $
                                    {cartItems
                                        .reduce(
                                            (acc, item) =>
                                                acc + item.qty * item.price,
                                            0
                                        )
                                        .toFixed(2)}
                                </span>
                            </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block btn-hover bg-dark kalnia-l'
                                disabled={cartItems.length === 0}
                            >
                                Proceed to checkout (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                ) items{' '}
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
