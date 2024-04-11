// post.service.ts
import { omit } from "lodash";
import PostModel, { Post } from "../models/post.model";
import {Schema, Types} from "mongoose";

//Create post function
export async function createPost(input: Post) {
  try {
    const post = await PostModel.create(input);
    return omit(post.toJSON(), ["likes", "comments"]);
  } catch (e: any) {
    throw new Error(e);
  }
}

//Find post function
export async function findPostsByUser(userId: string) {
  return PostModel.find({ user: userId }).lean();
}

// Pagination for retrieving posts
export async function findPosts(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  return PostModel.find().skip(skip).limit(limit).lean();
}

//Like post function
export async function likePost(postId: string, userId: string) {
    const post = await PostModel.findById(postId);
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    const userIdObject = new Schema.Types.ObjectId(userId);
  
    // Check if user has already liked the post
    if (post.likes.some(id => id === userIdObject)) {
      throw new Error("User already liked the post");
    }
  
    post.likes.push(userIdObject);
    await post.save();
  
    return { likes: post.likes, message: "Post liked successfully" };
  }
  
  //Unlike post function
  export async function unlikePost(postId: string, userId: string) {
    const post = await PostModel.findById(postId);
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    const userIdObject = new Schema.Types.ObjectId(userId);
  
    // Check if user has not liked the post
    if (post.likes.some(id => id !== userIdObject)) {
      throw new Error("User has not liked the post");
    }
  
    post.likes = post.likes.filter(id => id !== (userIdObject));
    await post.save();
  
    return { likes: post.likes, message: "Post unliked successfully" };
  }

