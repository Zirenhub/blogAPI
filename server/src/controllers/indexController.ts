import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IRequestUser } from '../middleware/jwtAuth';
import PostModel from '../models/post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({});
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

export const writeComment = async (req: Request, res: Response) => {};

export const createPost = async (req: IRequestUser, res: Response) => {
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
    res.json({ status: 'success', data: createdPost, message: null });
  } catch (err) {
    res
      .status(400)
      .json({ status: 'error', code: 400, data: err, message: null });
  }
};
