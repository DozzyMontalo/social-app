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
exports.unlikeComment = exports.likeComment = exports.findCommentsByPost = exports.createComment = void 0;
// comments.service.ts
const lodash_1 = require("lodash");
const comment_model_1 = __importDefault(require("../models/comment.model"));
const mongoose_1 = require("mongoose");
//create comment function
function createComment(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comment = yield comment_model_1.default.create(input);
            return (0, lodash_1.omit)(comment.toJSON(), "likes");
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.createComment = createComment;
//find post function
function findCommentsByPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return comment_model_1.default.find({ post: postId }).lean();
    });
}
exports.findCommentsByPost = findCommentsByPost;
//like comment function
function likeComment(commentId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_model_1.default.findById(commentId);
        const userIdObject = new mongoose_1.Schema.Types.ObjectId(userId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        // Check if user has already liked the comment
        if (comment.likes.some(Id => Id === userIdObject)) {
            throw new Error("User already liked the comment");
        }
        comment.likes.push(userIdObject);
        yield comment.save();
        return { likes: comment.likes, message: "Comment liked successfully" };
    });
}
exports.likeComment = likeComment;
//unlike Comment function
function unlikeComment(commentId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_model_1.default.findById(commentId);
        const userIdObject = new mongoose_1.Schema.Types.ObjectId(userId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        // Check if user has not liked the comment
        if (comment.likes.some(id => id !== userIdObject)) {
            throw new Error("User has not liked the comment");
        }
        comment.likes = comment.likes.filter(id => id !== userIdObject);
        yield comment.save();
        return { likes: comment.likes, message: "Comment unliked successfully" };
    });
}
exports.unlikeComment = unlikeComment;
