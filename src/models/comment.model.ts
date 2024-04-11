import mongoose, { Schema, Document } from 'mongoose';

export interface Comment {
  text: string;
  user?: Schema.Types.ObjectId;
  likes?: Schema.Types.ObjectId[];
  createdAt?: Date;
}

export interface CommentDocument extends Comment, Document {}

export const CommentSchema = new Schema<CommentDocument>(
  {
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model<CommentDocument>('Comment', CommentSchema);

export default CommentModel