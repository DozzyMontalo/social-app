import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, followUser, unfollowUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function followUserHandler(req: Request, res: Response) {
  const userId = req.params.userId;
  const followUserId = req.body.followUserId;

  try {
    const followingList = await followUser(userId, followUserId);
    return res.json({ followingList, message: "User followed successfully" });
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}

export async function unfollowUserHandler(req: Request, res: Response) {
  const userId = req.params.userId;
  const followUserId = req.body.followUserId;

  try {
    const followingList = await unfollowUser(userId, followUserId);
    return res.json({ followingList, message: "User unfollowed successfully" });
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
