import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  logInUser,
  signUpUser,
  getMe,
  logOut,
} from '../controllers/authController';

const router = express.Router();

router.post('/login', logInUser);
router.post('/signup', signUpUser);
router.post('/logout', jwtAuth, logOut);
router.get('/me', jwtAuth, getMe);

export default router;
