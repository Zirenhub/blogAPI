import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
