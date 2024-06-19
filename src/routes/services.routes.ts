import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getOneService,
  updateService,
} from "../controllers/services";
import { check } from "express-validator";
import auth from "../middleware/auth";

const router = Router();

router.get("/", getAllServices);
router.get(
  "/:id",
  [check("id", "Formato ID inválido").isMongoId()],
  getOneService
);
router.post(
  "/",
  auth("admin"),
  [
    check("nombre", "El campo nombre está vacío").notEmpty(),
    check("descripcion", "El campo descripción está vacío").notEmpty(),
    check("precio", "El campo precio está vacío").notEmpty(),
    check("imagen", "El campo imagen está vacío").notEmpty(),
  ],
  createService
);
router.put(
  "/:id",
  auth("admin"),
  [check("id", "Formato ID inválido").isMongoId()],
  updateService
);
router.delete(
  "/:id",
  auth("admin"),
  [check("id", "Formato ID inválido").isMongoId()],
  deleteService
);

export default router;
