import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/users";
import auth from "../middleware/auth";
import { check } from "express-validator";

const router = Router();

router.get("/", auth("admin"), getAllUsers);
router.post(
  "/",
  auth("admin"),
  [
    check("email", "El campo correo electrónico está vacío").notEmpty(),
    check("name", "El campo nombre está vacío").notEmpty(),
    check("password", "El campo contraseña está vacío").notEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  createUser
);
router.post(
  "/login",
  [
    check("email", "El campo correo electrónico está vacío").notEmpty(),
    check("password", "El campo contraseña está vacío").notEmpty(),
  ],
  loginUser
);
router.put(
  "/:id",
  auth("admin"),
  [check("id", "Formato ID inválido").isMongoId()],
  updateUser
);
router.delete(
  "/:id",
  auth("admin"),
  [check("id", "Formato ID inválido").isMongoId()],
  deleteUser
);

export default router;
