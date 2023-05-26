import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddleware";
import {
  endpointNotFound,
  generalErrorResponse,
} from "../../utils/responseData/responseData";

const expectedError = new CustomError(
  endpointNotFound.statusCode,
  endpointNotFound.message
);
const req = {};
const next = jest.fn();

describe("Given a notFoundError error middleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with a 404 status code and the 'Endpoint not found' error message", () => {
      const res = {};

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalError error middleware", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives an error with a 404 status code and a response", () => {
    test("Then it should call the response's method status with a 404 status code", () => {
      generalError(
        expectedError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedError.statusCode);
    });

    test("Then it should call the response's method json with a 'Endpoint not found' error message", () => {
      generalError(
        expectedError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedError.message });
    });
  });

  describe("When it receives an error without status code and a response", () => {
    const error = new Error();

    test("Then it should call the response's method status with 500", () => {
      const expectedStatusCode = generalErrorResponse.statusCode;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with 'General error' error message", () => {
      const expectedGeneralErrorMessage = generalErrorResponse.message;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        message: expectedGeneralErrorMessage,
      });
    });
  });
});
