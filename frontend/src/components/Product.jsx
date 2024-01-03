import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card className='my-2 p-2 bg-dark text-white card-shadow'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} className='product-link'>
                    <Card.Title as='div'>
                        <p className='kalnia-m text-white product-title'>
                            {product.name}
                        </p>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='p' className='kalnia-r'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
