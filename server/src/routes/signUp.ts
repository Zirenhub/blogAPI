import express from 'express';
import { createUser } from '../controllers/signUpController';

const router = express.Router();

router.post('/', createUser);

export default router;
