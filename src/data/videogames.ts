import { Types } from "mongoose";
import { type VideogameStructure } from "../types";

export const videogamesMock: VideogameStructure[] = [
  {
    _id: new Types.ObjectId("6474c186f583d0a4152044af"),
    name: "Metroid",
    genre: "metroidvania",
    image:
      "https://cdn.discordapp.com/attachments/1109434264811999275/1115315190372761810/Zelda_Tears_of_the_kingdom.jpg",
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

export const videogameByIdMock = [
  {
    id: "6474c186f583d0a4152044af",
    name: "Metroid",
    genre: "metroidvania",
    image:
      "https://cdn.discordapp.com/attachments/1109434264811999275/1115315190372761810/Zelda_Tears_of_the_kingdom.jpg",
    description: "The best shit in the entired world!",
    pegi: "13+",
    price: 44,
    developers: "Nintendo",
    user: "646fa078f583d0a4152044a8",
  },
  {
    id: "6474c186f583d0a4152045af",
    name: "Mario Kart",
    genre: "race",
    image:
      "https://cdn.discordapp.com/attachments/1109434264811999275/1115315188191727667/Mario_Kart_8_1.webp",
    description: "They see me rooling",
    pegi: "8+",
    price: 60,
    developers: "Nintendo",
    user: "646fa078f583d0a4152044a8",
  },
];
