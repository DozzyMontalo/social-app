import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    email: string;
    name: string;
    password: string;
  }
  
  export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    posts: Schema.Types.ObjectId[]; // Array of post IDs
    notifications: Schema.Types.ObjectId[]; // Array of notification IDs
    following: Schema.Types.ObjectId[];
  }
  
  export const UserSchema = new Schema<UserDocument>(
    {
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      password: { type: String, required: true },
      posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
      following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    },
    {
      timestamps: true,
    }
  );


  UserSchema.pre("save", async function (next) {
    let user = this as UserDocument;
  
    if (!user.isModified("password")) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  
    const hash = await bcrypt.hashSync(user.password, salt);
  
    user.password = hash;
  
    return next();
  });
  
  UserSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    const user = this as UserDocument;
  
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  };
  
  const UserModel = mongoose.model<UserDocument>("User", UserSchema);
  
  export default UserModel;
  