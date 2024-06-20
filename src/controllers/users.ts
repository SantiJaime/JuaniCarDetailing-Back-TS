import type { Request, Response } from "express";
import { type IUser } from "../types";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { generateToken } from "../middleware/jwt.config";

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allUsers: IUser[] = await UserModel.find();
    res.status(200).json({ msg: "Usuarios encontrados", allUsers });
  } catch (error) {
    res.status(500).json({ msg: "No se pudieron obtener los usuarios", error });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const userExist: IUser | null = await UserModel.findOne({
      email: req.body.email,
    });
    if (userExist) {
      res.status(409).json({ msg: "El usuario ya existe" });
      return;
    }
    const newUser = new UserModel(req.body);
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    newUser.save();

    res.status(201).json({ msg: "Usuario creado correctamente", newUser });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el usuario", error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }
    res
      .status(200)
      .json({ msg: "Usuario actualizado correctamente", updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el usuario", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
    return;
  }
  try {
    const user: IUser | null = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      res
        .status(404)
        .json({ msg: "Correo electrónico y/o contraseña incorrectos" });
      return;
    }
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
      res
        .status(401)
        .json({ msg: "Correo electrónico y/o contraseña incorrectos" });
      return;
    }
    const token = generateToken(user);
    res.status(200).json({ msg: "Sesión iniciada correctamente", user, token });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo iniciar sesión", error });
  }
};
