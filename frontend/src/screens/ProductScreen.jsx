import { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetSingleProductQuery,
    useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Meta from '../components/Meta';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetSingleProductQuery(productId);

    const [createReview, { isLoading: loadingReview }] =
        useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        //navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review created successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Link
                className='btn dives orbitron btn-hover my-3'
                to='/'
                style={{ backgroundColor: '#3c4c5d' }}
            >
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
                    <Meta title={product.name} />{' '}
                    <Row>
                        <Col md={5}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col md={4} className='orbitron'>
                            <ListGroup variant='flush'>
                                {/* Product */}
                                <ListGroup.Item className='dives planet-bg'>
                                    <h4 className='tektur'>{product.name}</h4>
                                </ListGroup.Item>
                                {/* Rating */}
                                <ListGroup.Item className='planet-bg tektur dives'>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                {/* Price */}
                                <ListGroup.Item className='tektur planet-bg'>
                                    <strong className='orbitron dives'>
                                        Price:
                                    </strong>{' '}
                                    ${product.price}
                                </ListGroup.Item>
                                {/* Description */}
                                <ListGroup.Item className='tektur planet-bg'>
                                    <span className='orbitron dives'>
                                        Description:{' '}
                                    </span>{' '}
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        {/* Card */}
                        <Col md={3}>
                            <Card className='orbitron'>
                                <ListGroup variant='flush'>
                                    {/*Price  */}
                                    <ListGroup.Item className='tektur planet-bg'>
                                        <Row>
                                            <Col className='dives orbitron'>
                                                Price:
                                            </Col>
                                            <Col>${product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* Status */}
                                    <ListGroup.Item className='tektur planet-bg'>
                                        <Row>
                                            <Col className='orbitron dives'>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* Quantity */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item className='tektur planet-bg'>
                                            <Row className='dives'>
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
                                    {/* Button */}
                                    <ListGroup.Item className='planet-bg'>
                                        <Button
                                            className='btn-block orbitron btn-hover dives'
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
                    {/* Reviews */}
                    <Row className='review orbitron'>
                        <Col md={6}>
                            <h3 className='tektur dives'>Reviews</h3>
                            {product.reviews.length === 0 && (
                                <Message>No Reviews</Message>
                            )}
                            {/* Create a review */}
                            <ListGroup.Item className='planet-bg'>
                                <h4 className='tektur dives'>Write a review</h4>
                                {loadingReview && <Loading />}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group
                                            controlId='rating'
                                            className='my-2 dives'
                                        >
                                            <Form.Label>Rating:</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) =>
                                                    setRating(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            >
                                                <option value=''>
                                                    Select...
                                                </option>
                                                <option value='1'>
                                                    1 - Poor
                                                </option>
                                                <option value='2'>
                                                    2 - Fair
                                                </option>
                                                <option value='3'>
                                                    3 - Good
                                                </option>
                                                <option value='4'>
                                                    4 - Very Good
                                                </option>
                                                <option value='5'>
                                                    5 - Excellent
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                        {/* Comment */}
                                        <Form.Group
                                            className='my-2 dives'
                                            controlId='comment'
                                        >
                                            <Form.Label>Comment:</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                required
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingReview}
                                            type='submit'
                                            className='btn-hover dives orbitron'
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please{' '}
                                        <Link
                                            to='/login'
                                            className='product-link'
                                        >
                                            Sign In
                                        </Link>{' '}
                                        to write a review
                                    </Message>
                                )}
                            </ListGroup.Item>
                            {/* List of reviews */}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item
                                        key={review._id}
                                        className='planet-bg'
                                    >
                                        <strong className='pink-bite'>
                                            {review.name}
                                        </strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p className='dives'>
                                            {review.comment}
                                        </p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
