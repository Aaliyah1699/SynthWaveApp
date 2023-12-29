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
    const { data: products, isLoading, error } = useGetAllProductsQuery();

    const deleteHandler = (id) => {
        console.log('delete', id);
    };

    return (
        <Row className='align-items-center'>
            <Col>
                <h2 className='kalnia-r'>Products</h2>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3 kalnia-l bg-dark'>
                    <TbPencilBolt /> Create Product
                </Button>
            </Col>
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
