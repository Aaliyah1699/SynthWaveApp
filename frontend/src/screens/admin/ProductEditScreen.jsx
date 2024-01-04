import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
    useGetSingleProductQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetSingleProductQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] =
        useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] =
        useUploadProductImageMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }).unwrap();
            toast.success('Product updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link
                to='/admin/productlist'
                className='btn dives btn-hover orbitron my-3'
                style={{ backgroundColor: '#3c4c5d' }}
            >
                Go Back
            </Link>
            {/* Form */}
            <FormContainer>
                <h2 className='tektur dives'>Edit Product</h2>
                {loadingUpdate && <Loading />}

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Message variant='danger'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        {/* Name */}
                        <Form.Group
                            controlId='name'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Price */}
                        <Form.Group
                            controlId='price'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Image */}
                        <Form.Group
                            controlId='image'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Image:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type='file'
                                label='Choose File'
                                onChange={uploadFileHandler}
                            ></Form.Control>
                            {loadingUpload && <Loading />}
                        </Form.Group>
                        {/* Brand */}
                        <Form.Group
                            controlId='brand'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Brand:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Category */}
                        <Form.Group
                            controlId='category'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Category:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Count in stock */}
                        <Form.Group
                            controlId='countInStock'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Count In Stock:</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Count In Stock'
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        {/* Description */}
                        <Form.Group
                            controlId='description'
                            className='orbitron my-2 dives'
                        >
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Button */}
                        <Button
                            type='submit'
                            className='my-2 orbitron dives btn-hover'
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
