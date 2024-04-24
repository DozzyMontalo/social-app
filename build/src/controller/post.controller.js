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
exports.unlikePostHandler = exports.likePostHandler = exports.getPostsHandler = exports.createPostHandler = void 0;
const post_model_1 = require("../models/post.model");
const post_service_1 = require("../service/post.service");
const logger_1 = __importDefault(require("../utils/logger"));
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extracting text and media from the request body
            const { text, media } = req.body;
            // Extracting user ID from the request headers
            const userId = req.headers['user-id'];
            if (!userId) {
                return res.status(400).json({ error: "User ID is missing in the headers" });
            }
            // Constructing the post input object
            const postInput = (0, post_model_1.constructPostInput)(text, media, userId);
            const createdPost = yield (0, post_service_1.createPost)(postInput);
            return res.status(201).json(createdPost);
        }
        catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.createPostHandler = createPostHandler;
function getPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        try {
            const posts = yield (0, post_service_1.findPosts)(page, limit);
            return res.send(posts);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getPostsHandler = getPostsHandler;
function likePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postId, userId } = req.params;
        try {
            const result = yield (0, post_service_1.likePost)(postId, userId);
            return res.send(result);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.likePostHandler = likePostHandler;
function unlikePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postId, userId } = req.params;
        try {
            const result = yield (0, post_service_1.unlikePost)(postId, userId);
            return res.send(result);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.unlikePostHandler = unlikePostHandler;
