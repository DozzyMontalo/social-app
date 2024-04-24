import { Request, Response } from "express";
import {Types, Schema} from "mongoose"
import { CreateCommentInput } from "../schema/comment.schema";
import { createComment, findCommentsByPost, likeComment, unlikeComment } from "../service/comment.service";
import logger from "../utils/logger";
import PostModel from "../models/post.model";

//create comment controller
export async function createCommentHandler(req: Request, res: Response) {
  try {
    // Extracting text from the request body
    const { text } = req.body as CreateCommentInput['body'];

    // Extracting user ID from the request headers
    const userId = req.headers['user-id'] as string;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing in the headers" });
    }

    // Converting userId to ObjectId type
    const userObjectId = new Schema.Types.ObjectId(userId);

    // Constructing the comment object
    const commentInput = {
      text,
      user: userObjectId,
      likes: [],
      createdAt: new Date(),
    };

    const createdComment = await createComment(commentInput);
    return res.status(201).json(createdComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCommentsHandler(req: Request, res: Response) {
  const { postId } = req.params;
  try {
    const comments = await findCommentsByPost(postId);
    return res.send(comments);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}

//Like comment controller
export async function likeCommentHandler(req: Request, res: Response) {
  const { commentId, userId } = req.params;

  try {
    const result = await likeComment(commentId, userId);
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}

//Unlike Comment Controller
export async function unlikeCommentHandler(req: Request, res: Response) {
  const { commentId, userId } = req.params;

  try {
    const result = await unlikeComment(commentId, userId);
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}
