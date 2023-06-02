import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import getVideogames from "../../controllers/videogames/videogamesController.js";

const videogamesRouter = Router();

videogamesRouter.get("/", auth, getVideogames);

export default videogamesRouter;
