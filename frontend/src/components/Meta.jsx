import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title className=''>{title}</title>
            <meta name='description' content={description} className='' />
            <meta name='keyword' content={keywords} className='' />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome To A SynthWave Showcase',
    description: 'Blast from the past',
    keywords: 'shopping, retro, synthwave',
};

export default Meta;
