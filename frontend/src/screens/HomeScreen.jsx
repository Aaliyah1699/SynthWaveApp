import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { GiStripedSun } from 'react-icons/gi';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';
import Loading from '../components/Loading';
import Message from '../components/Message';

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetAllProductsQuery({
        pageNumber,
        keyword,
    });

    return (
        <>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link
                    to='/'
                    className='btn dives orbitron btn-hover mb-4'
                    style={{ backgroundColor: '#3c4c5d' }}
                >
                    Go Back
                </Link>
            )}

            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <h1 className='tektur pink-bite text-center p-3 m-2'>
                        A SynthWave Showcase{' '}
                        <GiStripedSun className='synth-yellow' />
                    </h1>
                    <h2 className='tektur pink-bite pt-3'>
                        Shop Synthwave Essentials
                    </h2>
                    <Row className='orbitron'>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
