"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const const_1 = require("../constants/const");
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(const_1.MONGO_CONNECT);
        console.log("Base de datos operativa");
    }
    catch (error) {
        console.log("Error al conectarse a la base de datos", error);
    }
};
exports.dbConnection = dbConnection;
