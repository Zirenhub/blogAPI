import { Request, Response } from 'express';
import PostModel from '../models/post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
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
    res.json(createdPost);
  } catch (err) {
    res.status(400).json(err);
  }
};
