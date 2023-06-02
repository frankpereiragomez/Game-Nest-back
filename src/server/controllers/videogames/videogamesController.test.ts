import { type Response, type NextFunction, type Request } from "express";
import getVideogames from "./videogamesController";
import videogamesMock from "../../../data/videogames";
import { okResponse } from "../../utils/responseData/responseData";
import Videogame from "../../../database/models/Videogame";

describe("Given a getVideogames controller", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

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
