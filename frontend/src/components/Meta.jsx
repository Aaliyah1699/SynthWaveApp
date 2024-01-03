import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title className='kalnia-r'>{title}</title>
            <meta
                name='description'
                content={description}
                className='kalnia-r'
            />
            <meta name='keyword' content={keywords} className='kalnia-r' />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome To Gaget Grid',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
};

export default Meta;
