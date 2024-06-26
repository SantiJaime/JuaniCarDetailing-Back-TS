import type { Request, Response } from "express";
import TurnModel from "../models/turn";
import { ITurn } from "../types";
import { SCHEDULES } from "../constants/const";
import { validationResult } from "express-validator";

export const getTurns = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allTurns: ITurn[] = await TurnModel.find();
    res.status(200).json({ msg: "Turnos encontrados", allTurns });
  } catch (error) {
    res.status(500).json({ msg: "No se pudieron obtener los turnos", error });
  }
};

export const availableDates = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const { date } = req.query;
    if (!date) {
      res.status(400).json({
        msg: "No se ingresó ninguna fecha para comprobar disponibilidad",
      });
      return;
    }
    const allTurnsInDate: ITurn[] = await TurnModel.find({ date });

    if (allTurnsInDate.length === 0) {
      res
        .status(200)
        .json({ msg: "Fechas disponibles", availableSchedules: SCHEDULES });
      return;
    }

    const notAvailableSchedules: string[] = [];
    for (let i = 0; i < allTurnsInDate.length; i++) {
      const { hour } = allTurnsInDate[i];

      for (let j = 0; j < SCHEDULES.length; j++) {
        if (SCHEDULES[j] === hour) {
          notAvailableSchedules.push(SCHEDULES[j]);
        }
      }
    }
    const availableSchedules = SCHEDULES.filter(
      (schedule) => !notAvailableSchedules.includes(schedule)
    );
    res.status(200).json({ msg: "Fechas disponibles", availableSchedules });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al devolver fechas disponibles", error });
  }
};

export const createTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const turnExist: ITurn | null = await TurnModel.findOne({
      date: req.body.date,
      hour: req.body.hour,
    });

    if (turnExist) {
      res.status(409).json({ msg: "El turno ya se encuentra registrado" });
      return;
    }
    const newTurn: ITurn = new TurnModel(req.body);
    await newTurn.save();
    res.status(201).json({ msg: "Turno creado correctamente", newTurn });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el turno", error });
  }
};

export const deleteTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    await TurnModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Turno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el turno", error });
  }
};
