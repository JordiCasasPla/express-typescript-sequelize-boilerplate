import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AuthenticateCallback } from "passport";
import { config } from "./config";
import { tokenTypes } from "./tokens";
import { User } from "../models/User";

const jwtOptions = {
  secretOrKey: config.jwt.secret || "",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: AuthenticateCallback) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await User.findByPk(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
