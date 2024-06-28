"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const const_1 = require("../constants/const");
cloudinary_1.v2.config({
    cloud_name: const_1.CLOUD_NAME,
    api_key: const_1.CLOUD_API_KEY,
    api_secret: const_1.CLOUD_API_SECRET,
});
exports.default = cloudinary_1.v2;
