import { Express, Request, Response } from "express";
import {
  createPostHandler,
  getPostsHandler,
  likePostHandler,
  unlikePostHandler,
} from "./controller/post.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import {
    createCommentHandler,
    getCommentsHandler,
    likeCommentHandler,
    unlikeCommentHandler
} from "./controller/comment.controller"
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createPostSchema
} from "./schema/post.schema";
import { createCommentSchema } from "./schema/comment.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express){
  
 app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

 app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);


  app.post(
    "/api/post",
    [requireUser, validateResource(createPostSchema)],
    createPostHandler
  );

  app.get(
    "/api/post/:postId", requireUser,
    getPostsHandler
  );

  app.put("/api/post/:postId", requireUser, likePostHandler)

  app.put("/api/post/:postId", requireUser, unlikePostHandler)

//.................


app.post(
    "/api/comment",
    [requireUser, validateResource(createCommentSchema)],
    createPostHandler
  );

  app.get(
    "/api/comment/:postId", requireUser,
    getCommentsHandler
  );

  app.put("/api/comment/:commentId", requireUser, likeCommentHandler)

  app.put("/api/comment/:commentId", requireUser, unlikeCommentHandler)



}

export default routes;