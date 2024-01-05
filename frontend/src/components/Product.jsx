import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useEffect } from 'react';

const Product = ({ product }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Card className='my-2 p-2 card-shadow orbitron midnight'>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={`/uploads/${product.image}`}
                    variant='top'
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <p className='product-title dives'>{product.name}</p>
                    </Card.Title>
                </Link>
                <Card.Text as='div' className='dives tektur'>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='p' className='dives'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
