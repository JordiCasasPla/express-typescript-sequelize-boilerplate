import { body } from "express-validator";

const METHODS: { [key: string]: string } = {
  REFRESH: "refresh",
};

const validate = (method: string) => {
  if (!method || !METHODS[method]) {
    throw new Error("Invalid method");
  }

  const validate: { [key: string]: any[] } = {
    [METHODS.REFRESH]: [body("refreshToken").isString()],
  };

  return validate[method];
};

export const authValidations = {
  validate,
  METHODS,
};