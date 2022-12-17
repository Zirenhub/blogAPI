import express from 'express';
import { logUser } from '../controllers/logInController';

const router = express.Router();

router.post('/', logUser);

export default router;
