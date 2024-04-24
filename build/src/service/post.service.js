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
exports.unlikePost = exports.likePost = exports.findPosts = exports.findPostsByUser = exports.createPost = void 0;
const lodash_1 = require("lodash");
const post_model_1 = __importDefault(require("../models/post.model"));
const mongoose_1 = require("mongoose");
//Create post function
function createPost(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_model_1.default.create(input);
            return (0, lodash_1.omit)(post.toJSON(), ["likes", "comments"]);
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.createPost = createPost;
//Find post function
function findPostsByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return post_model_1.default.find({ user: userId }).lean();
    });
}
exports.findPostsByUser = findPostsByUser;
// Pagination for retrieving posts
function findPosts() {
    return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return post_model_1.default.find().skip(skip).limit(limit).lean();
    });
}
exports.findPosts = findPosts;
//Like post function
function likePost(postId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        const userIdObject = new mongoose_1.Schema.Types.ObjectId(userId);
        // Check if user has already liked the post
        if (post.likes.some(id => id === userIdObject)) {
            throw new Error("User already liked the post");
        }
        post.likes.push(userIdObject);
        yield post.save();
        return { likes: post.likes, message: "Post liked successfully" };
    });
}
exports.likePost = likePost;
//Unlike post function
function unlikePost(postId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        const userIdObject = new mongoose_1.Schema.Types.ObjectId(userId);
        // Check if user has not liked the post
        if (post.likes.some(id => id !== userIdObject)) {
            throw new Error("User has not liked the post");
        }
        post.likes = post.likes.filter(id => id !== (userIdObject));
        yield post.save();
        return { likes: post.likes, message: "Post unliked successfully" };
    });
}
exports.unlikePost = unlikePost;
