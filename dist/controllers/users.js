"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const jwt_config_1 = require("../middleware/jwt.config");
const const_1 = require("../constants/const");
const getAllUsers = async (_req, res) => {
    try {
        const allUsers = await user_1.default.find();
        res.status(200).json({ msg: "Usuarios encontrados", allUsers });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudieron obtener los usuarios", error });
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const userExist = await user_1.default.findOne({
            email: req.body.email,
        });
        if (userExist) {
            res.status(409).json({ msg: "El usuario ya existe" });
            return;
        }
        const newUser = new user_1.default(req.body);
        const hash = bcrypt_1.default.hashSync(newUser.password, 10);
        newUser.password = hash;
        newUser.save();
        res.status(201).json({ msg: "Usuario creado correctamente", newUser });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo crear el usuario", error });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const updatedUser = await user_1.default.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        }, {
            new: true,
        });
        if (!updatedUser) {
            res.status(404).json({ msg: "Usuario no encontrado" });
            return;
        }
        res
            .status(200)
            .json({ msg: "Usuario actualizado correctamente", updatedUser });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo actualizar el usuario", error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        await user_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Usuario eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo eliminar el usuario", error });
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
        return;
    }
    try {
        const user = await user_1.default.findOne({
            email: req.body.email,
        });
        if (!user) {
            res
                .status(404)
                .json({ msg: "Correo electrónico y/o contraseña incorrectos" });
            return;
        }
        const checkPass = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!checkPass) {
            res
                .status(401)
                .json({ msg: "Correo electrónico y/o contraseña incorrectos" });
            return;
        }
        const token = (0, jwt_config_1.generateToken)(user);
        res.status(200).json({ msg: "Sesión iniciada correctamente", user, token });
    }
    catch (error) {
        res.status(500).json({ msg: "No se pudo iniciar sesión", error });
    }
};
exports.loginUser = loginUser;
const isAuthenticated = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            res.status(422).json({ msg: "No ha envíado ningún token" });
            return;
        }
        const verifiedToken = (0, jwt_config_1.verifyToken)(token, const_1.SECRET_KEY);
        if (verifiedToken) {
            res
                .status(200)
                .json({ msg: "Autenticación exitosa", isAuthenticated: true });
        }
        else {
            res.status(401).json({ msg: "Token inválido o expirado" });
        }
    }
    catch (error) {
        console.error("Error inesperado al verificar la autenticación:", error);
        res.status(500).json({ msg: "Error al verificar autenticación", error });
    }
};
exports.isAuthenticated = isAuthenticated;
