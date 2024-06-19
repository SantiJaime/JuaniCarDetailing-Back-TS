import type { Request, Response } from "express";
import type { IUpdateServiceFields, IService } from "../types";
import { validationResult } from "express-validator";
import ServiceModel from "../models/service";

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
    const newService: IService = new ServiceModel(req.body);
    newService.save();
    res.status(201).json({ msg: "Servicio creado correctamente", newService });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el servicio", error });
  }
};

const filterFields = (
  body: Partial<IService>,
): IUpdateServiceFields => {
  const allowedFields: (keyof IUpdateServiceFields)[] = [
    "nombre",
    "descripcion",
    "precio",
    "categoria",
  ];
  const filteredBody: Partial<IUpdateServiceFields> = {};

  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key as keyof IUpdateServiceFields)) {
      filteredBody[key as keyof IUpdateServiceFields] =
        body[key as keyof IService];
    }
  });

  return filteredBody as IUpdateServiceFields;
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
    const filteredBody = filterFields(req.body);
    const updatedService: IService | null =
      await ServiceModel.findByIdAndUpdate(req.params.id, filteredBody, {
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
    await ServiceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el servicio", error });
  }
};
