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
exports.unfollowUser = exports.followUser = exports.findUser = exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(input);
            return (0, lodash_1.omit)(user.toJSON(), "password");
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.createUser = createUser;
function validatePassword(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return false;
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid)
            return false;
        return (0, lodash_1.omit)(user.toJSON(), "password");
    });
}
exports.validatePassword = validatePassword;
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOne(query).lean();
    });
}
exports.findUser = findUser;
function followUser(userId, followUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(userId);
        const followUser = yield user_model_1.default.findById(followUserId);
        if (!user || !followUser) {
            throw new Error("User or follow user not found");
        }
        // Check if user is already following the followUser
        if (user.following.includes(followUser._id)) {
            throw new Error("User already follows the follow user");
        }
        user.following.push(followUser._id);
        yield user.save();
        return user.following;
    });
}
exports.followUser = followUser;
function unfollowUser(userId, unfollowUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const unfollowUserString = unfollowUserId.toString();
        // Remove unfollowUserId from user's following list
        user.following = user.following.filter(id => id.toString() !== unfollowUserString);
        yield user.save();
        return { following: user.following, message: "User unfollowed successfully" };
    });
}
exports.unfollowUser = unfollowUser;
