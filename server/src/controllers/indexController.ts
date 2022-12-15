import { Request, Response } from 'express';
import PostModel from '../models/post';

export const getPosts = (req: Request, res: Response) => {
  res.send('GET ALL POSTS');
};

export const createPost = async (req: Request, res: Response) => {
  const title: String = req.body.title;
  const isPrivate: Boolean = req.body.private;

  const newPost = new PostModel({
    title,
    isPrivate,
  });

  try {
    const createdPost = await newPost.save();
    res.json(createdPost);
  } catch (err) {
    return res.status(400).json(err);
  }
};
