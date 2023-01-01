export type CommentT = {
  __v: number;
  _id: string;
  author: { username: string; _id: string };
  content: string;
  createdAt: Date;
  updatedAt: Date;
  post: string;
};

export type CommentTRaw = {
  __v: number;
  _id: string;
  author: { username: string; _id: string };
  content: string;
  createdAt: string;
  updatedAt: string;
  post: string;
};
