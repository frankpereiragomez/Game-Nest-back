import { Types } from "mongoose";
import { type VideogameStructure } from "../types";

const videogamesMock: VideogameStructure[] = [
  {
    _id: new Types.ObjectId(),
    name: "Metroid",
    genre: "metroidvania",
    image: "http://gfiaefae.com",
    description: "The best shit in the entired world!",
    pegi: "13+",
    price: 44,
    developers: "Nintendo",
    videogameCompany: "Nintendo Company",
    user: new Types.ObjectId("646fa078f583d0a4152044a8"),
  },
  {
    _id: new Types.ObjectId(),
    name: "Mario Kart",
    genre: "race",
    image: "http://gffdsfiaefae.com",
    description: "They see me rooling",
    pegi: "8+",
    price: 60,
    developers: "Nintendo",
    videogameCompany: "Nintendo Company",
    user: new Types.ObjectId("646fa078f583d0a4152044a8"),
  },
];

export default videogamesMock;
