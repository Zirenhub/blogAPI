import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  getPosts,
  getPost,
  writeComment,
  createPost,
} from '../controllers/indexController';

const router = express.Router();

router.post('/:id/comment', jwtAuth, writeComment);
router.get('/:id', getPost);

router.post('/', jwtAuth, createPost);
router.get('/', getPosts);

export default router;
