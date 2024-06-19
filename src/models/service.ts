/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Document, Schema, model } from "mongoose";
import { type IService } from "../types.d";

interface IServiceDocument extends IService, Document {}

const ServiceSchema = new Schema<IServiceDocument>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
});

ServiceSchema.methods.toJSON = function (): IServiceDocument {
  const { __v, ...service } = this.toObject();
  return service as IServiceDocument;
};

const ServiceModel = model<IServiceDocument>("Services", ServiceSchema);

export default ServiceModel;
