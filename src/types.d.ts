export interface IServer {
  listen(): void;
}
export interface IService {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}
export interface IUser {
  email: string;
  password: string;
  name: string;
  role: "admin";
}
export interface IUserLogin {
  email: string;
  password: string;
}
