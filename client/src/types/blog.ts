export type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  _v: number;
};

export type UpdatedDateBlog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
};
