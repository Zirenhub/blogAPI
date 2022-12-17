import { Request, Response } from 'express';
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

export const createPost = async (req: Request, res: Response) => {
  const title: string = req.body.title;
  const content: string = req.body.content;
  // get author
  const isPrivate: boolean = req.body.isPrivate;

  const newPost = new PostModel({
    title,
    content,
    // auhtor
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
