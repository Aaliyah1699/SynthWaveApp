import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
    return (
        <Alert variant={variant} className='orbitron'>
            {children}
        </Alert>
    );
};

Message.defaultProps = {
    variant: 'light',
};

export default Message;
