import jwt from "jsonwebtoken";
import type { JwtPayload, Secret } from "jsonwebtoken";
import { type IUserLogin } from "../types";
import { SECRET_KEY } from "../constants/const";

export const generateToken = (user: IUserLogin): string => {
  const token = jwt.sign({ user }, SECRET_KEY as Secret, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string, secretKey: Secret): JwtPayload => {
  const verify = jwt.verify(token, secretKey);
  return verify as JwtPayload;
};
