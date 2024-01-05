import { IoStarSharp, IoStarHalfSharp, IoStarOutline } from 'react-icons/io5';

const Rating = ({ value, text }) => {
    return (
        <div className='rating'>
            <span>
                {value >= 1 ? (
                    <IoStarSharp />
                ) : value >= 0.5 ? (
                    <IoStarHalfSharp />
                ) : (
                    <IoStarOutline />
                )}
            </span>
            <span>
                {value >= 2 ? (
                    <IoStarSharp />
                ) : value >= 1.5 ? (
                    <IoStarHalfSharp />
                ) : (
                    <IoStarOutline />
                )}
            </span>
            <span>
                {value >= 3 ? (
                    <IoStarSharp />
                ) : value >= 2.5 ? (
                    <IoStarHalfSharp />
                ) : (
                    <IoStarOutline />
                )}
            </span>
            <span>
                {value >= 4 ? (
                    <IoStarSharp />
                ) : value >= 3.5 ? (
                    <IoStarHalfSharp />
                ) : (
                    <IoStarOutline />
                )}
            </span>
            <span>
                {value >= 5 ? (
                    <IoStarSharp />
                ) : value >= 4.5 ? (
                    <IoStarHalfSharp />
                ) : (
                    <IoStarOutline />
                )}
            </span>
            <span className='rating-text'>{text && text}</span>
        </div>
    );
};

export default Rating;
