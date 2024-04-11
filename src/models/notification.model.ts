import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from './user.model';

export interface Notification {
  user: UserDocument; 
  type: 'mention' | 'like' | 'comment' | 'admin';
  postId?: Schema.Types.ObjectId; // Reference to the post associated with the notification
  read: boolean;
  createdAt: Date;
}

export interface NotificationDocument extends Notification, Document {}

export const NotificationSchema = new Schema<NotificationDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['mention', 'like', 'comment', 'admin'], required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }, // Reference to the post associated with the notification
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel = mongoose.model<NotificationDocument>('Notification', NotificationSchema);