import express from 'express'
import { register, login, logout, updateProfile } from '../controller/user.controller.js';
import authenticatedToken from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(authenticatedToken, updateProfile);

export default router;