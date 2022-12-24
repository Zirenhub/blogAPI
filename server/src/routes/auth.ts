import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { logInUser, signUpUser, getMe } from '../controllers/authController';

const router = express.Router();

router.post('/login', logInUser);
router.post('/signup', signUpUser);
router.get('/me', jwtAuth, getMe);

export default router;
