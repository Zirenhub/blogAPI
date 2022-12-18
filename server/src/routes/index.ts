import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  getPosts,
  getPost,
  writeComment,
  createPost,
} from '../controllers/indexController';

const router = express.Router();

router.get('/:id', getPost);
router.post('/:id/comments', writeComment);

router.get('/', getPosts);
router.post('/', jwtAuth, createPost);

export default router;
