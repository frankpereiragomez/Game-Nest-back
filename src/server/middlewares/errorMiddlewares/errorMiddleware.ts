import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import chalk from "chalk";
import {
  endpointNotFound,
  generalErrorResponse,
} from "../../utils/responseData/responseData.js";

const debug = createDebug("game-nest:server:middlewares:errorMiddleware");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    endpointNotFound.statusCode,
    endpointNotFound.message
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(`Error: ${chalk.red(error.message)}`);

  const statusCode = error.statusCode || generalErrorResponse.statusCode;

  const message = error.statusCode
    ? error.message
    : generalErrorResponse.message;

  res.status(statusCode).json({ message });
};
