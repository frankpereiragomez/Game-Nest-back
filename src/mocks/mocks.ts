import type BadRequest from "../server/routers/user/types.js";
import { Types } from "mongoose";
import {
  type UserCredentials,
  type UserCredentialsStructure,
} from "../server/types";

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
