import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import chalk from "chalk";
import {
  endpointNotFound,
  generalErrorResponse,
} from "../../utils/responseData/responseData.js";
import { ValidationError } from "express-validation";

const debug = createDebug("game-nest-api:server:middlewares:errorMiddlewares");

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

  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body
      .map((joiError) => joiError.message.replaceAll('"', ""))
      .join(" & ");

    (error as CustomError).publicMessage = validationError;
    debug(chalk.red(validationError));
  }

  const statusCode = error.statusCode || generalErrorResponse.statusCode;

  const message = error.statusCode
    ? error.message
    : generalErrorResponse.message;

  res.status(statusCode).json({ message });
};
