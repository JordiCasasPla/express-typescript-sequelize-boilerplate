import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from "http-status";
import { config } from "../config/config";
import { Auth as Token } from "../models";
import { ApiError } from "../errors";
import { tokenTypes } from "../config/tokens";
import { User } from "../models";

/**
 * Generate token
 * @param {Number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: Number,
  expires: Moment,
  type: string,
  secret: string = config.jwt.secret || ""
) => {
  if (!secret) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "JWT secret not set");
  }
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  user_id: number,
  expires: Moment,
  type: string,
  blacklisted: boolean = false
) => {
  const tokenDoc = await Token.create({
    token,
    user_id: user_id,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: string) => {
  if (!config.jwt.secret) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "JWT secret not set");
  }
  const payload = jwt.verify(token, config.jwt.secret);
  if (!payload && !payload?.sub) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
  const tokenDoc = await Token.findOne({
    where: {
      token: token,
      type,
      user_id: Number(payload.sub),
      blacklisted: false,
    },
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user: User) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export const tokenService = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
