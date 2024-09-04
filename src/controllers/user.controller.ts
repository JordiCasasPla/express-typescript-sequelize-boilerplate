import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/User";
import { ApiError } from "../errors";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(httpStatus.CREATED).json({ data: user });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(httpStatus.OK).json({ data: users });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.status(httpStatus.OK).json({ data: user });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.update(req.body);
  res.status(httpStatus.OK).json({ data: user });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.destroy();
  res.status(httpStatus.NO_CONTENT).json();
});

export const userController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
