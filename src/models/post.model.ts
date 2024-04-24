import mongoose, { Schema, Document, Types } from 'mongoose';
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

export function constructPostInput(text: string, media: string | undefined, userId: string): Post {
    const userObjectId = new Schema.Types.ObjectId(userId);
  
    const postInput: Post = {
      text,
      media,
      user: userObjectId,
      createdAt: new Date(),
      likes: [],
      comments: [],
    };
  
    return postInput;
  }