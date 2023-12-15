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

export { getAllProducts, getSingleProduct };
