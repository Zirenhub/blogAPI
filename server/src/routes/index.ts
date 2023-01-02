import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  getPosts,
  getPost,
  writeComment,
  createPost,
  getComments,
  deleteComment,
} from '../controllers/indexController';

const router = express.Router();

router.get('/:id/comments', getComments);
router.delete('/:id/comments/:comment', jwtAuth, deleteComment);

router.post('/:id', jwtAuth, writeComment);
router.get('/:id', getPost);

router.post('/', jwtAuth, createPost);
router.get('/', getPosts);

export default router;
