import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = Router();

const defaultRoutes = [
  {
    path: "/v1/api/users",
    route: userRouter,
  },
  {
    path: "/v1/api/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
