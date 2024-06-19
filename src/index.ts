import "dotenv/config.js";
import Server from "./server/app";
import { dbConnection } from "./database/config";

dbConnection();

const server = new Server();
server.listen();
