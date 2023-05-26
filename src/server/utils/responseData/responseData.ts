import {
  type UnauthorizedErrorStructure,
  type NotFoundErrorStructure,
  type GeneralErrorStructure,
  type OkResponseStructure,
} from "./types";

export const endpointNotFound: NotFoundErrorStructure = {
  statusCode: 404,
  message: "Endpoint not found",
};

export const wrongCredentials: UnauthorizedErrorStructure = {
  statusCode: 401,
  message: "Wrong credentials",
};

export const generalErrorResponse: GeneralErrorStructure = {
  statusCode: 500,
  message: "General error",
};

export const okResponse: OkResponseStructure = {
  statusCode: 200,
  message: "OK",
};
