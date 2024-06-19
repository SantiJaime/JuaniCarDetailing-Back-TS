import { type Secret } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../constants/const";
import { verifyToken } from "./jwt.config";

const auth =
  (role: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (token) {
        const verify = verifyToken(token, SECRET_KEY as Secret);
        if (verify && role === verify.user.role) next();
        else res.status(401).json({ msg: "No estás autorizado" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener el token", error });
    }
  };

export default auth;
