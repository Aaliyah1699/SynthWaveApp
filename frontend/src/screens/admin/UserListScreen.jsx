import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import {
    useDeleteUserMutation,
    useGetAllUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <h2 className='kalnia-r'>Users</h2>
            {loadingDelete && <Loading />}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Table
                    striped
                    hover
                    responsive
                    // variant='dark'
                    className='table-sm kalnia-r'
                >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck style={{ color: 'green' }} />
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>

                                <td>
                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer
                                                to={`/admin/user/${user._id}/edit`}
                                                style={{ marginRight: '10px' }}
                                            >
                                                <Button
                                                    className='btn-sm btn-hover kalnia-l'
                                                    variant='dark'
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() =>
                                                    deleteHandler(user._id)
                                                }
                                            >
                                                <FaTrash
                                                    style={{ color: 'white' }}
                                                />
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
