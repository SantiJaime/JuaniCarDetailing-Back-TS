"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTurn = exports.createTurn = exports.availableDates = exports.getTurns = void 0;
const turn_1 = __importDefault(require("../models/turn"));
const const_1 = require("../constants/const");
const express_validator_1 = require("express-validator");
const getTurns = async (_req, res) => {
    try {
        const allTurns = await turn_1.default.find();
        res.status(200).json({ msg: "Turnos encontrados", allTurns });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudieron obtener los turnos", error });
    }
};
exports.getTurns = getTurns;
const availableDates = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
        const allTurnsInDate = await turn_1.default.find({ date });
        if (allTurnsInDate.length === 0) {
            res
                .status(200)
                .json({ msg: "Fechas disponibles", availableSchedules: const_1.SCHEDULES });
            return;
        }
        const notAvailableSchedules = [];
        for (let i = 0; i < allTurnsInDate.length; i++) {
            const { hour } = allTurnsInDate[i];
            for (let j = 0; j < const_1.SCHEDULES.length; j++) {
                if (const_1.SCHEDULES[j] === hour) {
                    notAvailableSchedules.push(const_1.SCHEDULES[j]);
                }
            }
        }
        const availableSchedules = const_1.SCHEDULES.filter((schedule) => !notAvailableSchedules.includes(schedule));
        res.status(200).json({ msg: "Fechas disponibles", availableSchedules });
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error al devolver fechas disponibles", error });
    }
};
exports.availableDates = availableDates;
const createTurn = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const turnExist = await turn_1.default.findOne({
            date: req.body.date,
            hour: req.body.hour,
        });
        if (turnExist) {
            res.status(409).json({ msg: "El turno ya se encuentra registrado" });
            return;
        }
        const newTurn = new turn_1.default(req.body);
        await newTurn.save();
        res.status(201).json({ msg: "Turno creado correctamente", newTurn });
    }
    catch (error) {
        res.status(500).json({ msg: "Error al crear el turno", error });
    }
};
exports.createTurn = createTurn;
const deleteTurn = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        await turn_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Turno eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo eliminar el turno", error });
    }
};
exports.deleteTurn = deleteTurn;
