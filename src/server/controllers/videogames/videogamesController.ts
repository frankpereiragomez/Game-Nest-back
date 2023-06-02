import { type Request, type NextFunction, type Response } from "express";
import Videogame from "../../../database/models/Videogame.js";

const getVideogames = async (
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

export default getVideogames;
