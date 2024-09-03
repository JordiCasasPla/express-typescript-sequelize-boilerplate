import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

export const validateEnv = [
  check("NODE_ENV")
    .isIn(["production", "development", "test"])
    .withMessage("Invalid NODE_ENV"),
  check("PORT").isInt().withMessage("PORT must be a number").default(3000),
  check("HOST").notEmpty().withMessage("HOST is required"),
  check("DB_NAME").notEmpty().withMessage("DB_NAME is required"),
  check("DB_USER").notEmpty().withMessage("DB_USER is required"),
  check("DB_DIALECT").notEmpty().withMessage("DB_DIALECT is required"),
  check("DB_PASSWORD").notEmpty().withMessage("DB_PASSWORD is required"),
  check("DB_PORT").isInt().withMessage("DB_PORT must be a number"),
];

export const validateConfig = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(
      `Config validation error: ${errors
        .array()
        .map((err: any) => err.message)
        .join(", ")}`
    );
  }
  next();
};

export const config = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || "3000", 10),
  db: {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
