import { Request, Response } from "express";
import {constructPostInput} from "../models/post.model"
import { CreatePostInput } from "../schema/post.schema";
import { createPost, findPosts, likePost, unlikePost } from "../service/post.service";
import logger from "../utils/logger";

export async function createPostHandler(req: Request, res: Response) {
    try {
      // Extracting text and media from the request body
      const { text, media } = req.body as CreatePostInput['body'];
  
      // Extracting user ID from the request headers
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        return res.status(400).json({ error: "User ID is missing in the headers" });
      }
  
      // Constructing the post input object
      const postInput = constructPostInput(text, media, userId);
  
      const createdPost = await createPost(postInput);
      return res.status(201).json(createdPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

export async function getPostsHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const posts = await findPosts(page, limit);
    return res.send(posts);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}

export async function likePostHandler(req: Request, res: Response) {
  const { postId, userId } = req.params;

  try {
    const result = await likePost(postId, userId);
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}

export async function unlikePostHandler(req: Request, res: Response) {
  const { postId, userId } = req.params;

  try {
    const result = await unlikePost(postId, userId);
    return res.send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}
