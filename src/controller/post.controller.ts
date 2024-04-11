// post.controller.ts
import { Request, Response } from "express";
import { CreatePostInput } from "../schema/post.schema";
import { createPost, findPosts, likePost, unlikePost } from "../service/post.service";
import logger from "../utils/logger";

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) {
  try {
    const post = await createPost(req.body);
    return res.send(post);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
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
