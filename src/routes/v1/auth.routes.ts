import { Router } from "express";
import { authController } from "../../controllers";

const router = Router();

router
  .post("/login", authController.login)
  .post("/register", authController.register)
  .post("/logout", authController.logout)
  .post("/refresh-tokens", authController.refreshTokens);

export default router;
