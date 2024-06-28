"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEDULES = exports.ALLOWERD_MIME_TYPES = exports.CLOUD_API_SECRET = exports.CLOUD_API_KEY = exports.CLOUD_NAME = exports.SECRET_KEY = exports.MONGO_CONNECT = exports.PORT = void 0;
exports.PORT = process.env.PORT;
exports.MONGO_CONNECT = process.env.MONGO_CONNECT ?? "";
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.CLOUD_NAME = process.env.CLOUD_NAME;
exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
exports.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
exports.ALLOWERD_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "image/webp",
];
exports.SCHEDULES = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
];
