"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), users_1.getAllUsers);
router.post("/", (0, auth_1.default)("admin"), [
    (0, express_validator_1.check)("email", "El campo correo electrónico está vacío").notEmpty(),
    (0, express_validator_1.check)("name", "El campo nombre está vacío").notEmpty(),
    (0, express_validator_1.check)("password", "El campo contraseña está vacío").notEmpty(),
    (0, express_validator_1.check)("password", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
], users_1.createUser);
router.post("/login", [
    (0, express_validator_1.check)("email", "El campo correo electrónico está vacío").notEmpty(),
    (0, express_validator_1.check)("password", "El campo contraseña está vacío").notEmpty(),
], users_1.loginUser);
router.post("/verify-token", users_1.isAuthenticated);
router.put("/:id", (0, auth_1.default)("admin"), [
    (0, express_validator_1.check)("id", "Formato ID inválido").isMongoId(),
    (0, express_validator_1.check)("name", "El campo nombre está vacío").notEmpty(),
], users_1.updateUser);
router.delete("/:id", (0, auth_1.default)("admin"), [(0, express_validator_1.check)("id", "Formato ID inválido").isMongoId()], users_1.deleteUser);
exports.default = router;
