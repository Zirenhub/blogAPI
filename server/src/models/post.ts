import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IPost {
  title: String;
  isPrivate: Boolean;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
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
