import { Router } from "express";
import {
  getVideogames,
  removeVideogame,
} from "../../controllers/videogames/videogamesController.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogames);

videogamesRouter.delete("/:videogameId", auth, removeVideogame);

export default videogamesRouter;
