"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeCommentHandler = exports.likeCommentHandler = exports.getCommentsHandler = exports.createCommentHandler = void 0;
const mongoose_1 = require("mongoose");
const comment_service_1 = require("../service/comment.service");
const logger_1 = __importDefault(require("../utils/logger"));
//create comment controller
function createCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extracting text from the request body
            const { text } = req.body;
            // Extracting user ID from the request headers
            const userId = req.headers['user-id'];
            if (!userId) {
                return res.status(400).json({ error: "User ID is missing in the headers" });
            }
            // Converting userId to ObjectId type
            const userObjectId = new mongoose_1.Schema.Types.ObjectId(userId);
            // Constructing the comment object
            const commentInput = {
                text,
                user: userObjectId,
                likes: [],
                createdAt: new Date(),
            };
            const createdComment = yield (0, comment_service_1.createComment)(commentInput);
            return res.status(201).json(createdComment);
        }
        catch (error) {
            console.error("Error creating comment:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.createCommentHandler = createCommentHandler;
function getCommentsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postId } = req.params;
        try {
            const comments = yield (0, comment_service_1.findCommentsByPost)(postId);
            return res.send(comments);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getCommentsHandler = getCommentsHandler;
//Like comment controller
function likeCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId, userId } = req.params;
        try {
            const result = yield (0, comment_service_1.likeComment)(commentId, userId);
            return res.send(result);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.likeCommentHandler = likeCommentHandler;
//Unlike Comment Controller
function unlikeCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId, userId } = req.params;
        try {
            const result = yield (0, comment_service_1.unlikeComment)(commentId, userId);
            return res.send(result);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.unlikeCommentHandler = unlikeCommentHandler;
