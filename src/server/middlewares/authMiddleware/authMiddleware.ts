import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import {
  invalidToken,
  wrongCredentials,
} from "../../utils/responseData/responseData.js";
import { type CustomParamsRequest } from "../../types";

export const auth = (
  req: CustomParamsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        wrongCredentials.statusCode,
        wrongCredentials.message
      );
      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const { sub: id } = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = id as string;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(invalidToken.statusCode, invalidToken.message)
        : error;

    next(customError);
  }
};
