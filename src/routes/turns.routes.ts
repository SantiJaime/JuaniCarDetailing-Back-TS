import { Router } from "express";
import {
  availableDates,
  createTurn,
  deleteTurn,
  getTurns,
} from "../controllers/turns";
import { check, query } from "express-validator";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth("admin"), getTurns);
router.get(
  "/available-schedules",
  [
    query(
      "date",
      "Debe ingresar una fecha para comprobar disponibilidad"
    ).notEmpty(),
  ],
  availableDates
);
router.post(
  "/",
  [
    check("email", "Campo correo electonico obligatorio").notEmpty(),
    check("name", "Campo nombre y apellido obligatorio").notEmpty(),
    check("service", "Campo servicio a elegir obligatorio").notEmpty(),
    check("date", "Campo fecha obligatorio").notEmpty(),
    check("hour", "Campo hora obligatorio").notEmpty(),
  ],
  createTurn
);
router.delete(
  "/:id",
  [check("id", "Formato ID inválido").isMongoId()],
  deleteTurn
);

export default router;
