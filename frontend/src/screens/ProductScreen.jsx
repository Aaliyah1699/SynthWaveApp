import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useGetSingleProductQuery } from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const {
        data: product,
        isLoading,
        error,
    } = useGetSingleProductQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <>
            <Link className='btn btn-dark neon-hover kalnia-l btn-hover my-3'>
                Go Back
            </Link>

            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    {' '}
                    <Row>
                        <Col md={5}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={4} className='text-white bg-black '>
                            <ListGroup variant='flush'>
                                <ListGroup.Item className='text-white bg-black'>
                                    <h4 className='kalnia-m'>{product.name}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='text-white bg-black'>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item className='text-white bg-black kalnia-r'>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item className='text-white bg-black kalnia-l'>
                                    <span className='kalnia-m'>
                                        Description:{' '}
                                    </span>{' '}
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card className='bg-black text-white kalnia-r'>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item className='bg-black text-white'>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>${product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='bg-black text-white'>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item className='bg-black text-white kalnia-r '>
                                            <Row className='text-white bg-black'>
                                                <Col>Quantity:</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className='bg-black text-white kalnia-r'
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
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
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item className='bg-black text-white'>
                                        <Button
                                            className='btn-block btn-dark neon-hover kalnia-l btn-hover'
                                            type='button'
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
