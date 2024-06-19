import mongoose from "mongoose";
import { MONGO_CONNECT } from "../constants/const";

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_CONNECT);
    console.log("Base de datos operativa");
  } catch (error) {
    console.log("Error al conectarse a la base de datos", error);
  }
};
