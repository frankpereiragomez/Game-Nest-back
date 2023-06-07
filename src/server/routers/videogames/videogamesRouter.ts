import { Router } from "express";
import {
  getVideogames,
  removeVideogame,
} from "../../controllers/videogames/videogamesController.js";

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogames);

videogamesRouter.delete("/:videogameId", removeVideogame);

export default videogamesRouter;
