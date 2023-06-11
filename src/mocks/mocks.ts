import type BadRequest from "../server/routers/user/types.js";
import { Types } from "mongoose";
import {
  type UserCredentials,
  type UserCredentialsStructure,
} from "../server/types";
import { type VideogameDataStructure } from "../types.js";

export const mockUser: UserCredentialsStructure = {
  username: "admin",
  name: "Admin",
  password: "$2y$10$7qHU294Tv.KHLtarc.CUQ.4.Q9a9x.mIdLdbX/2CmCEtGy4kET0Ja",
};

export const invalidUserCredentialsMock: UserCredentials = {
  username: "admin",
  password: "administradora",
};

export const badRequestUserCredentials: BadRequest = {
  username: "admin",
  password: 123,
};

export const mockUserCredentials: UserCredentials = {
  username: "admin",
  password: "admin",
};

export const userMock: UserCredentialsStructure = {
  _id: new Types.ObjectId().toString(),
  username: "admin",
  password: "admin",
  name: "Admin",
};

export const tokenPayloadMock = {
  sub: "646fa078f583d0a4152044a8",
  name: "Admin",
};

export const newVideogameMock: Partial<VideogameDataStructure> = {
  name: "Pikmin 4",
  genre: "Strategy",
  price: 34,
  developers: "Nintendo",
  image: "1",
  pegi: "234",
  description: "Bal Bla Bla Pikmin 4",
};

export const realTokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA3OGY1ODNkMGE0MTUyMDQ0YTgiLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2ODY0MjA2NTgsImV4cCI6MTY4NzAyNTQ1OH0.O7LF55Zu-6RKHS7t8_a7vv6Mtbv5pqyyuTrwqRAyefA";
