import { type Response, type NextFunction, type Request } from "express";

import videogamesMock from "../../../data/videogames";
import { okResponse } from "../../utils/responseData/responseData";
import Videogame from "../../../database/models/Videogame";
import { getVideogames, removeVideogame } from "./videogamesController";
import { type CustomRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";
import { videogameNotFound } from "../../utils/responseData/responseData";

type CustomRequestWithParams = Pick<CustomRequest, "params">;

const res: Pick<Response, "status" | "json"> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getVideogames controller", () => {
  const req = {};

  describe("When it receives a response", () => {
    const expectedStatus = okResponse.statusCode;

    Videogame.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(videogamesMock),
      }),
    });

    test("Then it should call the response's method status with 200", async () => {
      await getVideogames(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of two videogames", async () => {
      await getVideogames(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ videogames: videogamesMock });
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Failed connecting to database' error", () => {
    test("Then it should call the next function with the error 'Failed connecting to database'", async () => {
      const expectedErrorMessage = new Error("Failed connecting to database");

      Videogame.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(expectedErrorMessage),
        }),
      });

      await getVideogames(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});

describe("Given a removeVideogame controller", () => {
  const req: CustomRequestWithParams = {
    params: {
      id: videogamesMock[0]._id.toString(),
    },
  };

  describe("When it receives a request with an id and the videogame exist", () => {
    const videogame = videogamesMock[0];

    test("Then it should call the respense's method status with 200", async () => {
      const expectedStatusCode = okResponse.statusCode;

      Videogame.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(videogame),
      });

      await removeVideogame(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test(`Then it should call the response's method json with a 'videogame ${req.params.id} deleted`, async () => {
      const expectedMessage = `videogame ${req.params.id} deleted`;

      await removeVideogame(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a next function and the videogame do not exist", () => {
    test("Then it should call the next function with a 'Videogame not found' error message", async () => {
      Videogame.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const expectedError = new CustomError(
        videogameNotFound.statusCode,
        videogameNotFound.message
      );

      await removeVideogame(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
