import jwt, { JsonWebTokenError } from "jsonwebtoken";
import type { JwtPayload, Secret } from "jsonwebtoken";
import { type IUserLogin } from "../types";
import { SECRET_KEY } from "../constants/const";

export const generateToken = (user: IUserLogin): string => {
  const token = jwt.sign({ user }, SECRET_KEY as Secret, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (
  token: string,
  secretKey: Secret
): JwtPayload | null => {
  try {
    const verify = jwt.verify(token, secretKey) as JwtPayload;
    return verify;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.error("Error de JWT:", error.message);
      throw error;
    }
    throw error;
  }
};
