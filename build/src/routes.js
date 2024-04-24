"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./controller/post.controller");
const session_controller_1 = require("./controller/session.controller");
const comment_controller_1 = require("./controller/comment.controller");
const user_controller_1 = require("./controller/user.controller");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const post_schema_1 = require("./schema/post.schema");
const comment_schema_1 = require("./schema/comment.schema");
const session_schema_1 = require("./schema/session.schema");
const user_schema_1 = require("./schema/user.schema");
function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
    app.post("/api/post", [requireUser_1.default, (0, validateResource_1.default)(post_schema_1.createPostSchema)], post_controller_1.createPostHandler);
    app.get("/api/post/:postId", requireUser_1.default, post_controller_1.getPostsHandler);
    app.put("/api/post/:postId", requireUser_1.default, post_controller_1.likePostHandler);
    app.put("/api/post/:postId", requireUser_1.default, post_controller_1.unlikePostHandler);
    //.................
    app.post("/api/comment", [requireUser_1.default, (0, validateResource_1.default)(comment_schema_1.createCommentSchema)], post_controller_1.createPostHandler);
    app.get("/api/comment/:postId", requireUser_1.default, comment_controller_1.getCommentsHandler);
    app.put("/api/comment/:commentId", requireUser_1.default, comment_controller_1.likeCommentHandler);
    app.put("/api/comment/:commentId", requireUser_1.default, comment_controller_1.unlikeCommentHandler);
}
exports.default = routes;
