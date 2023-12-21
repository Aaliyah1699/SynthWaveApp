import FormContainer from '../components/FormContainer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <FormContainer>
            <h2>Sign In</h2>
            <Form onSubmit={submitHandler}>
                {/* Email */}
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* Password */}
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* Button */}
                <Button type='submit' variant='dark' className='mt-2'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to='/register' className='link'>
                        Register Here
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
