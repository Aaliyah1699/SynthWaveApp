import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='planet-bg'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p className='glitch pool-blue'>
                            WAVE{' '}
                            <a
                                href='https://github.com/Aaliyah1699'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='pink-bite'
                            >
                                <FaGithub />
                            </a>{' '}
                            {currentYear}
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
