"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../constants/const");
const jwt_config_1 = require("./jwt.config");
const auth = (role) => (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            const verify = (0, jwt_config_1.verifyToken)(token, const_1.SECRET_KEY);
            if (verify && role === verify.user.role)
                next();
            else
                res.status(401).json({ msg: "No estás autorizado" });
        }
        else
            res.status(401).json({ msg: "No existe token" });
    }
    catch (error) {
        res.status(500).json({ msg: "Error al obtener el token", error });
    }
};
exports.default = auth;
