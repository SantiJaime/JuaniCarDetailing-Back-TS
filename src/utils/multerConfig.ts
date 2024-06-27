import { type Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import { ALLOWERD_MIME_TYPES } from "../constants/const";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (ALLOWERD_MIME_TYPES.includes(file.mimetype)) cb(null, true);
  else cb(null, false);
};

export const upload = multer({ storage, fileFilter });
