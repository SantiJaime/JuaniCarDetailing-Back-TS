import { type Document } from "mongoose";

export interface IServer {
  listen(): void;
}
export interface IService extends Document {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "admin";
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUpdateServiceFields {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
}

export interface ITurn extends Document {
  date: string;
  hour: string;
  email: string;
  name: string;
  service: string;
  description?: string;
}
