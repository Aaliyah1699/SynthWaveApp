import { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <Row>
            {/* Form with user data */}
            <Col md={3}>
                <h2 className='tektur dives'>My Profile</h2>
                {/* Form */}
                <Form onSubmit={submitHandler}>
                    {/* Name */}
                    <Form.Group
                        controlId='name'
                        className='my-2 orbitron dives'
                    >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Email */}
                    <Form.Group
                        controlId='email'
                        className='my-2 dives orbitron'
                    >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Password */}
                    <Form.Group
                        controlId='password'
                        className='my-2 dives orbitron'
                    >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Confirm Password */}
                    <Form.Group
                        controlId='confirmPassword'
                        className='my-2 dives orbitron'
                    >
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Button Update user info */}
                    <Button
                        type='submit'
                        className='btn-hover dives orbitron mt-2'
                    >
                        Update Profile
                    </Button>
                    {loadingUpdateProfile && <Loading />}
                </Form>
            </Col>
            {/* Users orders */}
            <Col md={9}>
                <h2 className='orbitron dives'>Order History</h2>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Message variant='info'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    // Order Table
                    <Table
                        striped
                        hover
                        responsive
                        className='table-sm orbitron '
                    >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td
                                        style={{
                                            borderBottom: '1px solid #ccc',
                                        }}
                                    >
                                        {order._id}
                                    </td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <FaTimes
                                                style={{ color: 'fd1d53' }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <FaTimes
                                                style={{ color: 'fd1d53' }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button className='btn-sm btn-hover dives '>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
