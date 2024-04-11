import { Request, Response } from "express";
import { CreateCommentInput } from "../schema/comment.schema";
import { createComment, likeComment, unlikeComment } from "../service/comment.service";
import logger from "../utils/logger";

export async function createCommentHandler(
  req: Request<{}, {}, CreateCommentInput["body"]>,
  res: Response
) {
  try {
    const comment = await createComment(req.body);
    return res.send(comment);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send("Internal Server Error");
  }
}

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
