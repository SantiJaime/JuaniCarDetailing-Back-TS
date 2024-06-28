"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: "admin" },
});
UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
