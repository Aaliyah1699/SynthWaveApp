import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/ProductModel.js';

// Fetch all products  // route -> GET /api/products // access => Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Get single product by id  // route -> GET /api/products/:id // access => Public
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// Create product // route -> POST /api/products // access => Private (Admin)
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// Update product // route -> PUT /api/products/:id // access => Private (Admin)
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Delete product // route -> DELETE /api/products/:id // access => Private (Admin)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Create new review // route -> POST /api/products/:id/reviews // access => Private
const createProductReview = asyncHandler(async (req, res) => {});

// Get top rated products // route -> GET /api/products/top // access => Public
const getTopProducts = asyncHandler(async (req, res) => {});

export {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
};
