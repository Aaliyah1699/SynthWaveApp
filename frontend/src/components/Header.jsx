import { Navbar, Nav, Container } from 'react-bootstrap';
import { TbShoppingCartBolt, TbUserBolt } from 'react-icons/tb';
import { CgMenuGridR } from 'react-icons/cg';
import { TfiBolt } from 'react-icons/tfi';
import { LinkContainer } from 'react-router-bootstrap';

//  Colors dark, light(white), info(turquoise)
const Header = () => {
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
                        <Navbar.Brand className='neon-pink fs-1 black-ops m-s-xxl neon-hover'>
                            G<TfiBolt />G
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
