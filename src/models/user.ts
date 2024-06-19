/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from "mongoose";
import { type IUser } from "../types";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});

UserSchema.methods.toJSON = function (): IUser {
  const { __v, password, ...user } = this.toObject();
  return user as IUser;
};

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
