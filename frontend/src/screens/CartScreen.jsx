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

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <Row>
            <Col md={8} className='orbitron'>
                <h1 style={{ marginBottom: '20px' }} className='tektur dives'>
                    Shopping Cart
                </h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty.{' '}
                        <Link
                            to='/'
                            className='planet'
                            style={{ textDecoration: 'underline' }}
                        >
                            Go Back
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item
                                key={item._id}
                                className='orbitron planet-bg'
                            >
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
                                            className='pink-bite'
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2} className='dives'>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        {' '}
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            className=' '
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
                                            className='border-0  orbitron btn-hover'
                                            onClick={() =>
                                                removeFromCartHandler(item._id)
                                            }
                                        >
                                            <GrTrash
                                                style={{ color: 'fd1d53' }}
                                            />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} className='orbitron'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='planet-bg'>
                            <h4 className='orbitron dives'>
                                Subtotal:{' '}
                                <span className='tektur'>
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
                        <ListGroup.Item className='planet-bg'>
                            <Button
                                type='button'
                                className='btn-block btn-hover dives orbitron'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
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
