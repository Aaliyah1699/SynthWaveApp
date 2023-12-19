import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { TbShoppingCartBolt, TbUserBolt } from 'react-icons/tb';
import { CgMenuGridR } from 'react-icons/cg';
import { TfiBolt } from 'react-icons/tfi';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
    // Display num of items in cart (accessing the state)
    const { cartItems } = useSelector((state) => state.cart);
    console.log(cartItems);

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
                    <LinkContainer to='/'>
                        <Navbar.Brand className='fs-1 black-ops m-s-xxl neon-pink-hover'>
                            G<TfiBolt className='neon-pink neon-hover' />G
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'>
                        <CgMenuGridR className='neon-pink neon-hover' />
                    </Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
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
                            <LinkContainer to='/login'>
                                <Nav.Link className='text-white kalnia-l'>
                                    <TbUserBolt className='neon-pink' />
                                    <span className='neon-pink-hover'>
                                        Sign In
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
