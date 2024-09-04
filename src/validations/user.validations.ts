import { body } from "express-validator";

const METHODS: { [key: string]: string } = {
  CREATE: "create",
  LOGIN: "login",
};

const validationRules = {
  [METHODS.CREATE]: [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("name").isString().withMessage("Name must be a string"),
    body("role").isNumeric().withMessage("Role must be a number"),
  ],
  [METHODS.LOGIN]: [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
};

export const userValidations = {
  validationRules,
  METHODS,
};
