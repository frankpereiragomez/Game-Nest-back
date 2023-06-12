import { type Response, type NextFunction } from "express";

import {
  badCreateResponse,
  okCreateResponse,
  okResponse,
} from "../../utils/responseData/responseData";
import Videogame from "../../../database/models/Videogame";
import {
  createVideogame,
  getVideogameById,
  getVideogames,
  removeVideogame,
} from "./videogamesController";
import CustomError from "../../../CustomError/CustomError";
import { videogameNotFound } from "../../utils/responseData/responseData";
import {
  type CustomRequestQuerys,
  type CustomParamsRequest,
} from "../../types";
import { newVideogameMock } from "../../../mocks/mocks";
import { videogamesMock } from "../../../data/videogames";

const req: Pick<CustomParamsRequest, "userId" | "body"> = {
  userId: "6474c186f583d0ad09204dd3",
  body: newVideogameMock,
};

const res: Pick<Response, "status" | "json"> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const videogame = videogamesMock[0];

describe("Given a getVideogames controller", () => {
  const req: Partial<CustomRequestQuerys> = {
    query: {
      limit: "10",
      skip: "5",
    },
  };

  describe("When it receives a response", () => {
    const expectedStatus = okResponse.statusCode;

    Videogame.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(videogamesMock),
    });

    Videogame.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue(videogamesMock.length),
    });

    test("Then it should call the response's method status with 200", async () => {
      await getVideogames(
        req as CustomRequestQuerys,
        res as Response,
        next as NextFunction
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of two videogames", async () => {
      await getVideogames(
        req as CustomRequestQuerys,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        videogames: videogamesMock,
        totalVideogames: videogamesMock.length,
      });
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Failed connecting to database' error", () => {
    test("Then it should call the next function with the error 'Failed connecting to database'", async () => {
      const expectedErrorMessage = new Error("Failed connecting to database");

      Videogame.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedErrorMessage),
      });

      await getVideogames(
        req as CustomRequestQuerys,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});

describe("Given a removeVideogame controller", () => {
  const req: Pick<CustomParamsRequest, "params"> = {
    params: { videogameId: videogamesMock[0]._id.toString() },
  };

  describe("When it receives a request with an id and the videogame exist", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = okResponse.statusCode;

      Videogame.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(videogame),
      });

      await removeVideogame(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test(`Then it should call the response's method json with a 'videogame deleted`, async () => {
      const expectedMessage = `videogame deleted`;

      await removeVideogame(
        req as CustomParamsRequest,
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
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a createVideogame controller", () => {
  describe("When it receives a request with an userId and a body with a new videogame", () => {
    test("Then it should return the response's method status with 200", async () => {
      Videogame.create = jest.fn().mockResolvedValue(newVideogameMock);

      await createVideogame(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(okCreateResponse.statusCode);
    });

    test("Then it should return the response's method json with the new videogame", async () => {
      Videogame.create = jest.fn().mockResolvedValue(newVideogameMock);

      await createVideogame(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ videogame: newVideogameMock });
    });
  });

  describe("When it receives a next function and the videogame cannot be created", () => {
    test("Then it should call the next function with the 'Cannot create your videogame!' error message", async () => {
      const expectedErrorMessage = new CustomError(
        badCreateResponse.statusCode,
        badCreateResponse.message
      );

      Videogame.create = jest.fn().mockResolvedValue(undefined);

      await createVideogame(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});

describe("Given a getVideogameById controller", () => {
  const req: Pick<CustomParamsRequest, "params"> = {
    params: { videogameId: videogamesMock[0]._id.toString() },
  };

  describe("When it receives a request with an  videogame id and the videogame exist", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = okResponse.statusCode;

      Videogame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(videogame),
      });

      await getVideogameById(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should return the response's method json with the videogame", async () => {
      Videogame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(videogame),
      });

      await getVideogameById(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ videogameById: videogame });
    });
  });

  describe("When it receives a request with an  videogame id and the videogame  doesn't exist", () => {
    test("Then it should call the next function with the 'Videogame not found' error message", async () => {
      const expectedErrorMessage = new CustomError(
        videogameNotFound.statusCode,
        videogameNotFound.message
      );

      Videogame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getVideogameById(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
