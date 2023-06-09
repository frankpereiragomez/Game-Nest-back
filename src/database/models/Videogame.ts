import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const videogameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pegi: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  developers: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Videogame = model("Videogame", videogameSchema, "videogames");

export default Videogame;
