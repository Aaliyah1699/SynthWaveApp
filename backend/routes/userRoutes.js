import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
} from '../controllers/userController.js';

router.route('/').post(registerUser).get(protect, admin, getAllUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .get(protect, admin, getSingleUser)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;
