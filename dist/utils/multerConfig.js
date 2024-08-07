"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const const_1 = require("../constants/const");
const storage = multer_1.default.memoryStorage();
const fileFilter = (_req, file, cb) => {
    if (const_1.ALLOWERD_MIME_TYPES.includes(file.mimetype))
        cb(null, true);
    else
        cb(null, false);
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
