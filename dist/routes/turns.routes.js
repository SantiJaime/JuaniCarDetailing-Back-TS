"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turns_1 = require("../controllers/turns");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), turns_1.getTurns);
router.get("/available-schedules", [
    (0, express_validator_1.query)("date", "Debe ingresar una fecha para comprobar disponibilidad").notEmpty(),
], turns_1.availableDates);
router.post("/", [
    (0, express_validator_1.check)("email", "Campo correo electonico obligatorio").notEmpty(),
    (0, express_validator_1.check)("name", "Campo nombre y apellido obligatorio").notEmpty(),
    (0, express_validator_1.check)("service", "Campo servicio a elegir obligatorio").notEmpty(),
    (0, express_validator_1.check)("date", "Campo fecha obligatorio").notEmpty(),
    (0, express_validator_1.check)("hour", "Campo hora obligatorio").notEmpty(),
], turns_1.createTurn);
router.delete("/:id", [(0, express_validator_1.check)("id", "Formato ID inválido").isMongoId()], turns_1.deleteTurn);
exports.default = router;
