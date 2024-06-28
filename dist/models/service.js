"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: {
        type: String,
        required: true,
        default: "http://imgfz.com/i/I96MuxF.png",
    },
});
ServiceSchema.methods.toJSON = function () {
    const { __v, ...service } = this.toObject();
    return service;
};
const ServiceModel = (0, mongoose_1.model)("Services", ServiceSchema);
exports.default = ServiceModel;
