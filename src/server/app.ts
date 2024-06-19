import express from "express";
import { PORT } from "../constants/const";
import servicesRoutes from "../routes/services.routes";
import usersRoutes from "../routes/users.routes";
import morgan from "morgan";
import cors from "cors";
import { type IServer } from "../types.d";

class Server implements IServer {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  private middleware(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }
  private routes(): void {
    this.app.use("/services", servicesRoutes);
    this.app.use("/users", usersRoutes);
  }
  listen(): void {
    this.app.listen(PORT, () => console.log("Servidor en línea"));
  }
}

export default Server;
