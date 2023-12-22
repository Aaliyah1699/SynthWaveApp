import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { TbShoppingCartBolt, TbUserBolt } from 'react-icons/tb';
import { CgMenuGridR } from 'react-icons/cg';
import { TfiBolt } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
    // Display num of items in cart (accessing the state)
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
            <Navbar
                bg='black'
                variant='dark'
                expand='md'
                collapseOnSelect
                className='neon-shadow-pink'
            >
                <Container>
                    {/* Nav Title */}
                    <LinkContainer to='/'>
                        <Navbar.Brand className='fs-1 black-ops m-s-xxl neon-pink-hover'>
                            G<TfiBolt className='neon-pink neon-hover' />G
                        </Navbar.Brand>
                    </LinkContainer>
                    {/* Small screen toggle */}
                    <Navbar.Toggle aria-controls='basic-navbar-nav'>
                        <CgMenuGridR className='neon-pink neon-hover' />
                    </Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {/* Cart */}
                            <LinkContainer to='/cart'>
                                <Nav.Link className='text-white kalnia-l neon-pink-hover'>
                                    <TbShoppingCartBolt className='neon-pink' />{' '}
                                    <span className='neon-pink-hover'>
                                        Cart
                                    </span>
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            style={{ marginLeft: '5px' }}
                                            className='neon-pink kalnia-m'
                                            bg='light'
                                        >
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id='username'
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link
                                        className='text-white kalnia-l'
                                        to='/login'
                                    >
                                        <TbUserBolt className='neon-pink' />
                                        <span className='neon-pink-hover'>
                                            Sign In
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {/* Sign in */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
