"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../controllers/services");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const multerConfig_1 = require("../utils/multerConfig");
const router = (0, express_1.Router)();
router.get("/", services_1.getAllServices);
router.get("/:id", [(0, express_validator_1.check)("id", "Formato ID inválido").isMongoId()], services_1.getOneService);
router.post("/", (0, auth_1.default)("admin"), multerConfig_1.upload.single("file"), [
    (0, express_validator_1.check)("nombre", "El campo nombre está vacío").notEmpty(),
    (0, express_validator_1.check)("descripcion", "El campo descripción está vacío").notEmpty(),
    (0, express_validator_1.check)("precio", "El campo precio está vacío").notEmpty(),
], services_1.createService);
router.put("/:id", (0, auth_1.default)("admin"), [(0, express_validator_1.check)("id", "Formato ID inválido").isMongoId()], services_1.updateService);
router.delete("/:id", (0, auth_1.default)("admin"), [(0, express_validator_1.check)("id", "Formato ID inválido").isMongoId()], services_1.deleteService);
exports.default = router;
