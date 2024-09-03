import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/index";
import { config } from "../config/config";
import { logger } from "../config/logger";
import { ValidationError } from "sequelize";

const errorConverter = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: any = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof ValidationError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  if (config.env === "development") {
    logger.error(err);
  }

  res.locals.errorMessage = err.message;
  res.status(statusCode).send({
    code: statusCode,
    message,
  });
};

export { errorConverter, errorHandler };
