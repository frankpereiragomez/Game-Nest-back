import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { wrongCredentials } from "../../utils/responseData/responseData.js";
import { type CustomRequest } from "../../types";

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
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

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = payload.sub as string;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(wrongCredentials.statusCode, "Invalid token")
        : error;

    next(customError);
  }
};
