import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IRequestUser } from '../middleware/jwtAuth';
import { body, validationResult } from 'express-validator';
import PostModel from '../models/post';
import CommentModel from '../models/comment';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({}, 'title createdAt updatedAt');
    res.json({ status: 'success', data: posts, message: null });
  } catch (err) {
    res
      .status(500)
      .json({ status: 'error', code: 500, data: err, message: null });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post) {
      res.json({ status: 'success', data: post, message: null });
    } else {
      throw new Error('Post not found.');
    }
  } catch (err: any) {
    res.status(404).json({
      status: 'error',
      code: 404,
      data: err,
      message: err.message,
    });
  }
};

export const writeComment = [
  body('content')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Comment cannot be empty'),

  async (req: IRequestUser, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        code: 400,
        data: { errors: errors.array() },
        message: null,
      });
    } else {
      const author: Types.ObjectId = req.user._id;
      const content: string = req.body.content;
      const post: string = req.params.id;

      const postRef = await PostModel.findById(post);

      if (postRef) {
        const newComment = new CommentModel({
          author,
          content,
          post,
        });

        try {
          newComment.populate('author', 'username -_id');
          const createdComment = await newComment.save();
          res
            .status(201)
            .json({ status: 'success', data: createdComment, message: null });
        } catch (err) {
          res
            .status(400)
            .json({ status: 'error', code: 400, data: err, message: null });
        }
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          data: null,
          message: 'Invalid post',
        });
      }
    }
  },
];

export const getComments = async (req: Request, res: Response) => {
  const postID: string = req.params.id;
  const post = await PostModel.findById(postID);
  if (post) {
    try {
      const comments = await CommentModel.find({ post: postID }).populate(
        'author',
        'username'
      );
      res.json({ status: 'success', data: comments, message: null });
    } catch (err) {
      res
        .status(500)
        .json({ status: 'error', code: 500, data: err, message: null });
    }
  } else {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: null,
      message: 'Invalid Post',
    });
  }
};

export const createPost = [
  body('title').trim().escape().notEmpty().withMessage('Title cannot be empty'),
  body('content')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Content cannot be empty'),
  body('isPrivate').isBoolean().withMessage('Post has to be private or public'),

  async (req: IRequestUser, res: Response) => {
    const title: string = req.body.title;
    const content: string = req.body.content;
    const author: Types.ObjectId = req.user._id;
    const isPrivate: boolean = req.body.isPrivate;

    const newPost = new PostModel({
      title,
      content,
      author,
      isPrivate,
    });

    try {
      const createdPost = await newPost.save();
      res
        .status(201)
        .json({ status: 'success', data: createdPost, message: null });
    } catch (err) {
      res
        .status(400)
        .json({ status: 'error', code: 400, data: err, message: null });
    }
  },
];

export const deleteComment = async (req: IRequestUser, res: Response) => {
  const postID = req.params.id;
  const commentID = req.params.comment;

  try {
    const post = await PostModel.findById(postID);
    if (post) {
      const comment = await CommentModel.findById(commentID);
      // also check if post matches with comment reference
      if (comment && comment.author.equals(req.user._id)) {
        comment.deleteOne();
        res.json({ status: 'success', data: null, message: null });
      }
    }
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'error',
        code: 400,
        data: err,
        message: 'Something went wront deleting this comment',
      });
  }
};
