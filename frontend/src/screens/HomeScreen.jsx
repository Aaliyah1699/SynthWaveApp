import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GiHypersonicBolt } from 'react-icons/gi';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import Loading from '../components/Loading';
import Message from '../components/Message';

const HomeScreen = () => {
    const { pageNumber } = useParams();
    const { data, isLoading, error } = useGetAllProductsQuery({ pageNumber });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    {' '}
                    <h1 className='kalnia-m text-center p-3 m-2'>
                        Welcome To Gadget Grid{' '}
                        <GiHypersonicBolt className='neon-pink' />
                    </h1>
                    <h2 className='kalnia-l pt-3'>Latest Gadgets</h2>
                    <Row className='kalnia-r'>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={data.pages} page={data.page} />
                </>
            )}
        </>
    );
};

export default HomeScreen;
