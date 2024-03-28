import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

// Authenticate user and generate token upon successful login
// Time complexity: O(1) average case (email index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> POST /api/users/login // access => Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
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

// Create a new user account
// Time complexity: O(1) average case (email index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> POST /api/users // access => Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Clear user's authentication token cookie and send logout message
// Time complexity: O(1)
// Space complexity: O(1)
// Route -> POST /api/users/logout // access => Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out' });
});

// Get the logged-in user's profile data
// Time complexity: O(1) average case (ID index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> GET /api/users/profile // access => Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Update the logged-in user's profile data
// Time complexity: O(1) average case (ID index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> PUT /api/users/profile // access => Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Get all users
// Time complexity: O(n) - retrieves all users
// Space complexity: O(n) - all users in memory (worst case)
// Route -> GET /api/users // access => Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// Get a single user by ID &  Excludes password from response
// Time complexity: O(1) average case (ID index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> GET /api/users/:id // access => Private/Admin
const getSingleUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Delete a user but Cannot delete admin users
// Time complexity: O(1) average case (ID index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> DELETE /api/users/:id // access => Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Can not delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Update a user by ID 
// Time complexity: O(1) average case (ID index), O(n) worst case (no index)
// Space complexity: O(1)
// Route -> PUT /api/users/:id // access => Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
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
