import express from 'express';
import { logInUser, signUpUser } from '../controllers/authController';

const router = express.Router();

router.post('/login', logInUser);
router.post('/signup', signUpUser);

export default router;
