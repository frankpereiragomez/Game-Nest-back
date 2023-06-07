import { type Request, type NextFunction, type Response } from "express";
import Videogame from "../../../database/models/Videogame.js";
import CustomError from "../../../CustomError/CustomError.js";
import { videogameNotFound } from "../../utils/responseData/responseData.js";
import { type CustomParamsRequest } from "../../types.js";

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

    res
      .status(200)
      .json({ message: `videogame ${videogame._id.toString()} deleted` });
  } catch (error: unknown) {
    next(error);
  }
};
