import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { TfiTrash } from 'react-icons/tfi';
import { MdEditRoad } from 'react-icons/md';
import { RiCheckDoubleLine } from 'react-icons/ri';
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
            <h2 className='tektur dives'>Users</h2>
            {loadingDelete && <Loading />}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant='info'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Table striped hover responsive className='table-sm tektur'>
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
                                        <RiCheckDoubleLine
                                            style={{ color: 'ffd319' }}
                                        />
                                    ) : (
                                        <FaTimes style={{ color: 'fd1d53' }} />
                                    )}
                                </td>

                                <td>
                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer
                                                to={`/admin/user/${user._id}/edit`}
                                                style={{ marginRight: '10px' }}
                                            >
                                                <Button className='btn-sm btn-hover '>
                                                    <MdEditRoad
                                                        className='pink-bite'
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                    />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                className='btn-sm btn-hover'
                                                onClick={() =>
                                                    deleteHandler(user._id)
                                                }
                                            >
                                                <TfiTrash
                                                    style={{
                                                        color: 'ff6c11',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
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
