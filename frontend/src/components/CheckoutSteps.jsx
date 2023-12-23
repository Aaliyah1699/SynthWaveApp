import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4 kalnia-l'>
            {/* Step1 Sign In*/}
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link className='link product-link'>
                            Sign In
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link
                        className='text-light '
                        style={{ opacity: '0.6' }}
                        disabled
                    >
                        Sign In
                    </Nav.Link>
                )}
            </Nav.Item>
            {/* Step2 Shipping*/}
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link className='link product-link'>
                            Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link
                        className='text-light '
                        style={{ opacity: '0.6' }}
                        disabled
                    >
                        Shipping
                    </Nav.Link>
                )}
            </Nav.Item>
            {/* Step3 Payment */}
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link className='link product-link'>
                            Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link
                        className='text-light '
                        style={{ opacity: '0.6' }}
                        disabled
                    >
                        Payment
                    </Nav.Link>
                )}
            </Nav.Item>
            {/* Step4 Place Order */}
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link className='link product-link'>
                            Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link
                        className='text-light '
                        style={{ opacity: '0.6' }}
                        disabled
                    >
                        Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
