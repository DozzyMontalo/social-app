// user.service.ts
import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function followUser(userId: string, followUserId: string) {
  const user = await UserModel.findById(userId);
  const followUser = await UserModel.findById(followUserId);

  if (!user || !followUser) {
    throw new Error("User or follow user not found");
  }

  // Check if user is already following the followUser
  if (user.following.includes(followUser._id)) {
    throw new Error("User already follows the follow user");
  }

  user.following.push(followUser._id);
  await user.save();

  return user.following;
}

export async function unfollowUser(userId: string, unfollowUserId: string) {
    const user = await UserModel.findById(userId);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const unfollowUserString = unfollowUserId.toString();
  
    // Remove unfollowUserId from user's following list
    user.following = user.following.filter(id => id.toString() !== unfollowUserString);
    await user.save();
  
    return { following: user.following, message: "User unfollowed successfully" };
  }
