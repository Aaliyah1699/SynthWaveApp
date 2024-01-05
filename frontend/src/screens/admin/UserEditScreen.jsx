import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
    useUpdateUserMutation,
    useGetUserDetailsQuery,
} from '../../slices/usersApiSlice';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('user updated successfully');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    return (
        <>
            <Link
                to='/admin/userlist'
                className='btn dives btn-hover orbitron my-3'
                style={{ backgroundColor: '#3c4c5d' }}
            >
                Go Back
            </Link>
            <FormContainer>
                <h2 className='tektur dives'>Edit User</h2>
                {loadingUpdate && <Loading />}

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <Message variant='info'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        {/* Name */}
                        <Form.Group
                            className='my-2 orbitron dives'
                            controlId='name'
                        >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Email */}
                        <Form.Group
                            className='my-2 orbitron dives'
                            controlId='email'
                        >
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {/* Admin */}
                        <Form.Group
                            className='my-2 orbitron dives'
                            controlId='isadmin'
                        >
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        {/* Button */}
                        <Button
                            type='submit'
                            className='btn-hover orbitron dives'
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
