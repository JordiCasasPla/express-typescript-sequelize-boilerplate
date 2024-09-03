import { Router } from "express";
import userRouter from "./user.routes";

const router = Router();

const defaultRoutes = [
  {
    path: "/api/users",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;