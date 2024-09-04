import httpStatus from "http-status";
import { ApiError } from "../errors";
import { User } from "../models/User";

/**
 * get a user from the database
 * @param id user id
 * @returns return a promise with the user
 */
const getUserById = async (id: number) => {
  return User.findByPk(id);
};

/**
 *  get all users from the database
 * @returns return a promise with all users
 */
const getAllUsers = async () => {
  return User.findAll();
};

const getUserByEmail = async (email: string) => {
  return User.scope('withPassword').findOne({ where: { email } });
};


/**
 * create a new user in the database
 * @param user user to create
 * @returns return a promise with the created user
 */
const createUser = async (user: User) => {
  return User.create(user);
};

/**
 * update a user in the database
 * @param id
 * @param user
 * @returns return a promise with the updated user
 */
const updateUser = async (id: number, user: User) => {
  const inDatabase = await getUserById(id);
  if (!inDatabase) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return User.update(user, { where: { id } });
};

/**
 * delete a user from the database
 * @param id user id
 * @returns returns a promise with the deleted user
 */
const deleteUserById = async (id: number) => {
  const inDatabase = await getUserById(id);
  if (!inDatabase) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return User.destroy({ where: { id } });
};

export const userService = {
  getUserById,
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUserById,
};
