"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config.js");
const app_1 = __importDefault(require("./server/app"));
const config_1 = require("./database/config");
(0, config_1.dbConnection)();
const server = new app_1.default();
server.listen();
