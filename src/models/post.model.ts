import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from './user.model';

export interface Post {
  text: string;
  media?: string;
  user: UserDocument["_id"];
  createdAt: Date;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
}

export interface PostDocument extends Post, Document {}

export const PostSchema = new Schema<PostDocument>(
  {
    text: { type: String, required: true },
    media: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model<PostDocument>('Post', PostSchema);

export default PostModel