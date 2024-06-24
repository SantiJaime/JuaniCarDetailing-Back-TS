import type { Request, Response } from "express";
import { type IService } from "../types";
import { validationResult } from "express-validator";
import ServiceModel from "../models/service";
import cloudinaryConfig from "../utils/cloudinaryConfig";

export const getAllServices = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const services: IService[] = await ServiceModel.find();
    res.status(200).json({ msg: "Servicios encontrados", services });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudieron obtener los servicios", error });
  }
};

export const getOneService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const service: IService | null = await ServiceModel.findById(req.params.id);
    res.status(200).json({ msg: "Servicio encontrado", service });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar el servicio", error });
  }
};

export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

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
    const newService: IService = new ServiceModel(req.body);

    cloudinaryConfig.uploader
      .upload_stream(
        { resource_type: "image", folder: "Juani-Detailing" },
        async (error, result) => {
          if (result) {
            newService.imagen = result.secure_url;
            await newService.save();
            res
              .status(201)
              .json({ msg: "Servicio creado correctamente", newService });
            return;
          }
          console.error(
            "Hubo un error al subir la imagen a Cloudinary:",
            error
          );
          res
            .status(500)
            .json({ msg: "Error al subir la imagen a Cloudinary", error });
        }
      )
      .end(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo crear el servicio", error });
  }
};

export const updateService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const updatedService: IService | null =
      await ServiceModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    res
      .status(200)
      .json({ msg: "Servicio actualizado correctamente", updatedService });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el servicio", error });
  }
};

export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const deletedService: IService | null = await ServiceModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedService) {
      res.status(404).json({ msg: "Servicio no encontrado" });
      return;
    }
    const imageCode: string = deletedService.imagen
      .split("/")[8]
      .split(".")[0];
    await cloudinaryConfig.uploader.destroy(`Juani-Detailing/${imageCode}`);

    res.status(200).json({ msg: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el servicio", error });
  }
};
