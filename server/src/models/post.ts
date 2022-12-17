import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPrivate: boolean;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      requirted: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
