import { Router } from "express";
import {
  createVideogame,
  getVideogameById,
  getVideogames,
  removeVideogame,
} from "../../controllers/videogames/videogamesController.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import { validate } from "express-validation";
import videogameSchema from "../../../schemas/videogameSchema.js";

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogames);

videogamesRouter.delete("/:videogameId", auth, removeVideogame);

videogamesRouter.post(
  "/create",
  auth,
  validate(videogameSchema, {}, { abortEarly: false }),
  createVideogame
);

videogamesRouter.get("/:videogameId", getVideogameById);

export default videogamesRouter;
