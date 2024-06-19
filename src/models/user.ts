/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Document, Schema, model } from "mongoose";
import { type IUser } from "../types";

interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});

UserSchema.methods.toJSON = function (): IUserDocument {
  const { __v, password, ...user } = this.toObject();
  return user as IUserDocument;
};

const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;
