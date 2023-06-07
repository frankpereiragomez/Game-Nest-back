import { Router } from "express";
import { getVideogames } from "../../controllers/videogames/videogamesController.js";

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogames);

export default videogamesRouter;
