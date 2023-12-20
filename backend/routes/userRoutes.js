import express from 'express';
const router = express.Router();
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

router.route('/').post(registerUser).get(getAllUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
