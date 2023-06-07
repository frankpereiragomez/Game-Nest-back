import jwt from "jsonwebtoken";
import { type Response, type Request, type NextFunction } from "express";
import { auth } from "./authMiddleware";
import { type CustomRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";
import {
  invalidToken,
  wrongCredentials,
} from "../../utils/responseData/responseData";
import { realTokenMock, tokenPayloadMock } from "../../../mocks/mocks";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a authMiddleware middleware", () => {
  const token = realTokenMock;

  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${token}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it recieves an Authorization header with a valid token and a next funcion", () => {
    test("Then it should call the next function", () => {
      jwt.verify = jest.fn().mockReturnValue(tokenPayloadMock);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an Authorization header with an invalid token and a next function", () => {
    test("Then it should call the next function with a 'Invalid token' error message", () => {
      const expectedError = new CustomError(
        invalidToken.statusCode,
        invalidToken.message
      );
      expectedError.name = "JsonWebTokenError";

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an Authorization header without Bearer and a next function", () => {
    test("The it should call the received next function with a 401 'Missing token' error", () => {
      const expectedError = new CustomError(
        wrongCredentials.statusCode,
        wrongCredentials.message
      );

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(token),
      };

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
