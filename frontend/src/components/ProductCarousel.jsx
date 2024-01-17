import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Message from './Message';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? null : error ? (
        <Message variant='info'>
            {error?.data?.message || error.error}
        </Message>
    ) : (
        <Carousel pause='hover' className='midnight mb-4 ' fade>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            style={{
                                height: '500px',
                                width: '600px',
                                objectFit: 'cover',
                            }}
                        />
                        <Carousel.Caption className='carousel-caption orbitron dives'>
                            <h2 className=' text-right'>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
