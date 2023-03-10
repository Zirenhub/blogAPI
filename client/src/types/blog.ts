export type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type BlogOverviewRaw = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogOverview = {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};
