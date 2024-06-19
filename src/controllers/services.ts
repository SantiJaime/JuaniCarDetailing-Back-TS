import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import ServiceModel from "../models/service";

export const getAllServices = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const services = await ServiceModel.find();
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
    const service = await ServiceModel.findById(req.params.id);
    if (!service) {
      res.status(404).json({ msg: "Servicio no encontrado" });
      return;
    }
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
    const newService = new ServiceModel(req.body);
    newService.save();
    res.status(201).json({ msg: "Servicio creado correctamente", newService });
  } catch (error) {
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
    const updatedService = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedService) {
      res.status(404).json({ msg: "Servicio no encontrado" });
      return;
    }
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
    await ServiceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el servicio", error });
  }
};
