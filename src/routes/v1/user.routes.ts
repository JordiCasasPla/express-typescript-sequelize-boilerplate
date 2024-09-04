import { Router } from "express";
import { userController } from "../../controllers";
const router = Router();

router
  .get("/", userController.getUsers)
  .get("/:id", userController.getUser)
  .post("/", userController.createUser)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

export default router;
