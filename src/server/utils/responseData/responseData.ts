import { type ResponseStructure } from "./types";

export const endpointNotFound: ResponseStructure = {
  statusCode: 404,
  message: "Endpoint not found",
};

export const videogameNotFound: ResponseStructure = {
  statusCode: 404,
  message: "Videogame not found",
};

export const wrongCredentials: ResponseStructure = {
  statusCode: 401,
  message: "Wrong credentials",
};

export const invalidToken: ResponseStructure = {
  statusCode: 401,
  message: "Invalid token",
};

export const generalErrorResponse: ResponseStructure = {
  statusCode: 500,
  message: "General error",
};

export const okResponse: ResponseStructure = {
  statusCode: 200,
  message: "OK",
};

export const okCreateResponse: ResponseStructure = {
  statusCode: 201,
  message: "Your videogame was sucessfully created",
};

export const badRequestResponse: ResponseStructure = {
  statusCode: 400,
  message: "Validation Failed",
};

export const badCreateResponse: ResponseStructure = {
  statusCode: 400,
  message: "Cannot create your videogame!",
};
