import { type Types } from "mongoose";

export interface VideogameDataStructure {
  name: string;
  genre: string;
  price: number;
  pegi: string;
  description: string;
  developers: string;
  image: string;
  videogameCompany: string;
  user: Types.ObjectId;
}

export interface VideogameStructure extends VideogameDataStructure {
  _id: Types.ObjectId;
}
