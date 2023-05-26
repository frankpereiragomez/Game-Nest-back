import { type NextFunction, type Response } from "express";
import {
  type UserCredentialsStructure,
  type UserCredentialsRequest,
} from "../../types";
import bcrypt from "bcryptjs";
import User from "../../../database/models/User";
import jwt from "jsonwebtoken";
import { loginUser } from "./userController";
import CustomError from "../../../CustomError/CustomError";
import { Types } from "mongoose";
import {
  okResponse,
  wrongCredentials,
} from "../../utils/responseData/responseData";

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  const req: Pick<UserCredentialsRequest, "body"> = {
    body: {
      username: "admin",
      password: "admin",
    },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const userMock: UserCredentialsStructure = {
    _id: new Types.ObjectId().toString(),
    username: "admin",
    password: "admin",
  };

  describe("When it receives a request with a valid credentials and a response", () => {
    const expectedToken = "J.J.Token";

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(userMock),
    });

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue(expectedToken);

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = okResponse.statusCode;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token: expectedToken });
    });
  });

  describe("When it receives a not valid credentials and a next function", () => {
    test("Then it should call the next function with a 401 status code and a 'Wrong credentials' error message", async () => {
      const error = new CustomError(
        wrongCredentials.statusCode,
        wrongCredentials.message
      );

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
