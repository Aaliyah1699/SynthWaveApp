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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetSingleProductQuery,
    useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        navigate('/cart');
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

    return (
        <>
            <Link
                className='btn btn-dark neon-hover kalnia-l btn-hover my-3'
                to='/'
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
                    {/* Reviews */}
                    <Row className='review kalnia-r'>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {product.reviews.length === 0 && (
                                <Message>No Reviews</Message>
                            )}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                {/* Create a review */}
                                <ListGroup.Item>
                                    <h4>Write a review</h4>
                                    {loadingReview && <Loading />}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group
                                                controlId='rating'
                                                className='my-2'
                                            >
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            Number(
                                                                e.target.value
                                                            )
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
                                                className='my-2'
                                                controlId='comment'
                                            >
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    required
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingReview}
                                                type='submit'
                                                variant='dark'
                                                className='btn-hover kalnia-l'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{' '}
                                            <Link to='/login'>Sign In</Link> to
                                            write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
