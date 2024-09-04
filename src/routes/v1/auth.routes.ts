import { Router } from "express";
import { authController } from "../../controllers";
import { userValidations, validationMiddleware } from "../../validations";

const router = Router();

router
  .post(
    "/login",
    validationMiddleware(userValidations.validationRules[userValidations.METHODS.LOGIN]),
    authController.login
  )
  .post(
    "/register",
    validationMiddleware(userValidations.validationRules[userValidations.METHODS.CREATE]),
    authController.register
  )
export default router;