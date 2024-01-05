import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { TfiTrash } from 'react-icons/tfi';
import { MdEditRoad } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
    useGetAllProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
} from '../../slices/productsApiSlice';
import Message from '../../components/Message';
import Loading from '../../components/Loading';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetAllProductsQuery({
        pageNumber,
    });

    const [deleteProduct, { isLoading: loadingDelete }] =
        useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const [createProduct, { isLoading: loadingCreate }] =
        useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        }
    };

    return (
        <Row className='align-items-center'>
            <Col>
                <h2 className='tektur dives'>Products</h2>
            </Col>
            <Col className='text-end'>
                <Button
                    className='btn-sm m-3 orbitron btn-hover dives'
                    onClick={createProductHandler}
                >
                    <MdEditRoad className='synth-yellow' /> Create Product
                </Button>
            </Col>
            {loadingCreate && <Loading />}
            {loadingDelete && <Loading />}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='info'>
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <Table striped hover responsive className='tektur table-sm'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                {/* extra for button */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
                                        >
                                            <Button className='neon-pink btn-hover btn-sm mx-2'>
                                                <MdEditRoad className='pink-bite' />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            className='btn-sm btn-hover'
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <TfiTrash
                                                style={{
                                                    color: 'ff6c11',
                                                }}
                                            />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        isAdmin={true}
                    />
                </>
            )}
        </Row>
    );
};

export default ProductListScreen;
