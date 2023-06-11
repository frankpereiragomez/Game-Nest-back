import { type Request } from "express";
import { type VideogameDataStructure } from "../types";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserCredentialsStructure extends UserCredentials {
  _id?: string;
  name: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface CustomRequest extends Request {
  userId: string;
}

export interface CustomParamsRequest extends Request {
  userId: string;
  params: {
    videogameId: string;
  };
  body: Partial<VideogameDataStructure>;
}

export interface CustomRequestQuerys extends Request {
  query: {
    limit: string;
    skip: string;
  };
}
