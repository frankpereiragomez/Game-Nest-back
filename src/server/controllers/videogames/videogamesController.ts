import { type Request, type NextFunction, type Response } from "express";
import Videogame from "../../../database/models/Videogame.js";
import CustomError from "../../../CustomError/CustomError.js";
import {
  badCreateResponse,
  okCreateResponse,
  videogameNotFound,
} from "../../utils/responseData/responseData.js";
import { type CustomParamsRequest } from "../../types.js";
import { Types } from "mongoose";

export const getVideogames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videogames = await Videogame.find().limit(10).exec();

    res.status(200).json({ videogames });
  } catch (error) {
    next(error);
  }
};

export const removeVideogame = async (
  req: CustomParamsRequest,
  res: Response,
  next: NextFunction
) => {
  const { videogameId } = req.params;

  try {
    const videogame = await Videogame.findByIdAndDelete(videogameId).exec();

    if (!videogame) {
      const error = new CustomError(
        videogameNotFound.statusCode,
        videogameNotFound.message
      );

      throw error;
    }

    res.status(200).json({ message: `videogame deleted` });
  } catch (error: unknown) {
    next(error);
  }
};

export const createVideogame = async (
  req: CustomParamsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const addVideogame = req.body;

    const newVideogame = await Videogame.create({
      ...addVideogame,
      user: new Types.ObjectId(userId),
    });

    if (!newVideogame) {
      const error = new CustomError(
        badCreateResponse.statusCode,
        badCreateResponse.message
      );

      throw error;
    }

    res.status(okCreateResponse.statusCode).json({ videogame: newVideogame });
  } catch (error) {
    next(error);
  }
};
