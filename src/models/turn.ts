/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from "mongoose";
import { type ITurn } from "../types";

const TurnSchema = new Schema<ITurn>({
  date: { type: String, required: true },
  hour: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String },
});

TurnSchema.methods.toJSON = function (): ITurn {
  const { __v, ...turn } = this.toObject();
  return turn as ITurn;
};

const TurnModel = model<ITurn>("Turns", TurnSchema);

export default TurnModel;
