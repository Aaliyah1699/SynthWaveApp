import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
        rating: {
            type: Number,
            required: [true, 'Please provide rating'],
            default: 0,
        },
        comment: {
            type: String,
            required: [true, 'Please provide comment'],
        },
    },
    { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            trim: true,
            required: [true, 'Please provide product name'],
            maxLength: [100, 'Name can not be more than 100 characters'],
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: [true, 'Please provide brand name'],
        },
        category: {
            type: String,
            required: [true, 'Please provide product category'],
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
            maxLength: [
                1000,
                'Description can not be more than 1000 characters',
            ],
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
