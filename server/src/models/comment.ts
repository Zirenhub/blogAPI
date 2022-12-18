import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

interface IComment {
  author: Types.ObjectId;
  content: string;
  post: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
