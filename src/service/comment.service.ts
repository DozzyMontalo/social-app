// comments.service.ts
import { omit } from "lodash";
import CommentModel, { CommentDocument, Comment } from "../models/comment.model";
import { Schema } from "mongoose";

//create comment function
export async function createComment(input: Comment) {
  try {
    const comment = await CommentModel.create(input);
    return comment.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

//find post function
export async function findCommentsByPost(postId: string) {
  return CommentModel.find({ post: postId }).lean();
}

//like comment function
export async function likeComment(commentId: string, userId: string) {
  const comment = await CommentModel.findById(commentId);
  const userIdObject = new Schema.Types.ObjectId(userId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Check if user has already liked the comment
  if (comment.likes.some(Id => Id === userIdObject )) {
    throw new Error("User already liked the comment");
  }

  comment.likes.push(userIdObject);
  await comment.save();

  return { likes: comment.likes, message: "Comment liked successfully" };
}

//unlike Comment function
export async function unlikeComment(commentId: string, userId: string) {
  const comment = await CommentModel.findById(commentId);

  const userIdObject = new Schema.Types.ObjectId(userId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Check if user has not liked the comment
  if (comment.likes.some(id => id !== userIdObject)) {
    throw new Error("User has not liked the comment");
  }

  comment.likes = comment.likes.filter(id => id !== userIdObject);
  await comment.save();

  return { likes: comment.likes, message: "Comment unliked successfully" };
}
