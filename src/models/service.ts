/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from "mongoose";
import { type IService } from "../types";

const ServiceSchema = new Schema<IService>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
});

ServiceSchema.methods.toJSON = function (): IService {
  const { __v, ...service } = this.toObject();
  return service as IService;
};

const ServiceModel = model<IService>("Services", ServiceSchema);

export default ServiceModel;
