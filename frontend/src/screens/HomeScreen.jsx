import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { GiHypersonicBolt } from 'react-icons/gi';
import { useGetAllProductsQuery } from '../slices/productsApiSlice.js';

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetAllProductsQuery();

    return (
        <>
            {isLoading ? (
                <h2 className='kalnia-l'>Loading...</h2>
            ) : error ? (
                <div>{error?.data?.message || error.error}</div>
            ) : (
                <>
                    {' '}
                    <h1 className='kalnia-m text-center p-3 m-2'>
                        Welcome To Gadget Grid{' '}
                        <GiHypersonicBolt className='neon-pink' />
                    </h1>
                    <h2 className='kalnia-l pt-3'>Latest Gadgets</h2>
                    <Row className='kalnia-r'>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomeScreen;
