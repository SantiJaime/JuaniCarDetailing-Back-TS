"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = require("mongoose");
const TurnSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    hour: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    service: { type: String, required: true },
    vehicle: { type: String, required: true },
    details: { type: String },
});
TurnSchema.methods.toJSON = function () {
    const { __v, ...turn } = this.toObject();
    return turn;
};
const TurnModel = (0, mongoose_1.model)("Turns", TurnSchema);
exports.default = TurnModel;
