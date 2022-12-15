import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
