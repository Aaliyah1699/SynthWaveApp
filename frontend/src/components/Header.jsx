import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { PiCarThin, PiBuildingsThin } from 'react-icons/pi';
import { GiWaves } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

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
            dispatch(resetCart()); // prevent cart inheritance
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
            <Navbar
                className='midnight sapph-shadow'
                expand='md'
                collapseOnSelect
            >
                <Container>
                    {/* Nav Title */}
                    <LinkContainer to='/' className='pool-blue-active'>
                        <Navbar.Brand className='fs-1 m-s-xl broken pool-blue'>
                         <span className='pink-bite'>Synth</span>WAVE
                        </Navbar.Brand>
                    </LinkContainer>
                    {/* Small screen toggle */}
                    <Navbar.Toggle aria-controls='basic-navbar-nav'>
                        <GiWaves className='pool-blue' />
                    </Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto orbitron dives'>
                            {/* Search Box */}
                            <SearchBox />
                            {/* Cart */}
                            <LinkContainer to='/cart'>
                                {/* Sign in */}
                                <Nav.Link className='orbitron dives'>
                                    <PiCarThin className='pink-bite' />{' '}
                                    <span className='orbitron dives'>Cart</span>
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            style={{
                                                marginLeft: '5px',
                                            }}
                                            className='orbitron dives'
                                        >
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {/* Dropdown for all users */}
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id='username'
                                    menuVariant='dark'
                                    className='orbitron'
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
                                    <Nav.Link className='' to='/login'>
                                        <PiBuildingsThin className='pink-bite' />
                                        <span className='dives'>Sign In</span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {/* Admin dropdown only */}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown
                                    title='Admin'
                                    id='adminmenu'
                                    className='orbitron '
                                    menuVariant='dark'
                                >
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
