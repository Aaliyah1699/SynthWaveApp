import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

// Login user & get token  // route -> POST /api/users/login // access => Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        // expiresIn: process.env.JWT_LIFETIME,
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            // expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === 'production',
            //signed: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
// Register user // route -> POST /api/users // access => Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});
// Logout user & clear cookie // route -> POST /api/users/logout // access => Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});
// Get user profile // route -> GET /api/users/profile // access => Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('user profile');
});
// Update user profile // route -> PUT /api/users/profile // access => Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});
// Get all users // route -> GET /api/users // access => Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    res.send('all users');
});
// Get single user // route -> GET /api/users/:id // access => Private/Admin
const getSingleUser = asyncHandler(async (req, res) => {
    res.send('single user');
});
// Delete user // route -> DELETE /api/users/:id // access => Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});
// Update user // route -> PUT /api/users/:id // access => Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
