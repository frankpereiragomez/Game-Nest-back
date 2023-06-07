import { type Request } from "express";

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
  id: string;
}
