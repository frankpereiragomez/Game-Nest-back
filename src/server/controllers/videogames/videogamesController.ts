import { type Request, type NextFunction, type Response } from "express";
import Videogame from "../../../database/models/Videogame";

const getVideogames = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videogames = await Videogame.find().limit(10).exec();

    res.status(200);
    res.json({ videgames: videogames });
  } catch (error: unknown) {
    next(error);
  }
};

export default getVideogames;
