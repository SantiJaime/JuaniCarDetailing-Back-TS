"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const const_1 = require("../constants/const");
const services_routes_1 = __importDefault(require("../routes/services.routes"));
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const turns_routes_1 = __importDefault(require("../routes/turns.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use("/services", services_routes_1.default);
        this.app.use("/users", users_routes_1.default);
        this.app.use("/turns", turns_routes_1.default);
    }
    listen() {
        this.app.listen(const_1.PORT, () => console.log("Servidor en línea"));
    }
}
exports.default = Server;
