import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../errors";
import httpStatus from "http-status";

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: any) {
    const err = error.errors && error.errors[0].msg;
    if (err) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: err });
    }
  }
};

export const validationMiddleware = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    validateResult(req, res, next);
  };
};

export default validateResult;
