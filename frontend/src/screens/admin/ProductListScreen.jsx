import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { GrTrash } from 'react-icons/gr';
import { TbDatabaseHeart, TbPencilBolt, TbPlus } from 'react-icons/tb';
import {
    useGetAllProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
} from '../../slices/productsApiSlice';
import Message from '../../components/Message';
import Loading from '../../components/Loading';
// import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
    const {
        data: products,
        isLoading,
        error,
        refetch,
    } = useGetAllProductsQuery();

    const [deleteProduct, { isLoading: loadingDelete }] =
        useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
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
                <h2 className='kalnia-r'>Products</h2>
            </Col>
            <Col className='text-end'>
                <Button
                    className='btn-sm m-3 kalnia-l bg-dark'
                    onClick={createProductHandler}
                >
                    <TbPencilBolt /> Create Product
                </Button>
            </Col>
            {loadingCreate && <Loading />}
            {loadingDelete && <Loading />}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <Table
                        striped
                        hover
                        responsive
                        className='kalnia-r table-sm'
                    >
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
                            {products.map((product) => (
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
                                            <Button
                                                className='neon-pink btn-hover btn-sm mx-2'
                                                variant='dark'
                                            >
                                                <TbPencilBolt />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='dark'
                                            className='btn-sm'
                                            style={{ color: 'red' }}
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <GrTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Row>
    );
};

export default ProductListScreen;
