import { Joi } from "express-validation";
import { type VideogameDataStructure } from "../types";

const videogameSchema = {
  body: Joi.object<Partial<VideogameDataStructure>>({
    name: Joi.string().required(),
    genre: Joi.string().required(),
    price: Joi.number().required(),
    pegi: Joi.string(),
    description: Joi.string().required(),
    developers: Joi.string().required(),
    image: Joi.string().required(),
  }),
};

export default videogameSchema;
