"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.createService = exports.getOneService = exports.getAllServices = void 0;
const express_validator_1 = require("express-validator");
const service_1 = __importDefault(require("../models/service"));
const cloudinaryConfig_1 = __importDefault(require("../utils/cloudinaryConfig"));
const getAllServices = async (_req, res) => {
    try {
        const services = await service_1.default.find();
        res.status(200).json({ msg: "Servicios encontrados", services });
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "No se pudieron obtener los servicios", error });
    }
};
exports.getAllServices = getAllServices;
const getOneService = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const service = await service_1.default.findById(req.params.id);
        res.status(200).json({ msg: "Servicio encontrado", service });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo encontrar el servicio", error });
    }
};
exports.getOneService = getOneService;
const createService = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        if (!req.file?.buffer) {
            res
                .status(422)
                .json({ msg: "No se cargó ninguna imagen para el servicio" });
            return;
        }
        const buffer = Buffer.from(req.file.buffer);
        const newService = new service_1.default(req.body);
        cloudinaryConfig_1.default.uploader
            .upload_stream({ resource_type: "image", folder: "Juani-Detailing" }, async (error, result) => {
            if (result) {
                newService.imagen = result.secure_url;
                await newService.save();
                res
                    .status(201)
                    .json({ msg: "Servicio creado correctamente", newService });
                return;
            }
            console.error("Hubo un error al subir la imagen a Cloudinary:", error);
            res
                .status(500)
                .json({ msg: "Error al subir la imagen a Cloudinary", error });
        })
            .end(buffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "No se pudo crear el servicio", error });
    }
};
exports.createService = createService;
const updateService = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const updatedService = await service_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res
            .status(200)
            .json({ msg: "Servicio actualizado correctamente", updatedService });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo actualizar el servicio", error });
    }
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const deletedService = await service_1.default.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            res.status(404).json({ msg: "Servicio no encontrado" });
            return;
        }
        const imageCode = deletedService.imagen
            .split("/")[8]
            .split(".")[0];
        await cloudinaryConfig_1.default.uploader.destroy(`Juani-Detailing/${imageCode}`);
        res.status(200).json({ msg: "Servicio eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo eliminar el servicio", error });
    }
};
exports.deleteService = deleteService;
