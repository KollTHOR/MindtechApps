import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { expireTimeIn } from "../config";

dotenv.config();

export const jwtService = {
  async generateAccessToken(userId: string, fullName: string): Promise<string> {
    const key: string = `${process.env.SECRET_KEY}`;
    return jwt.sign({ userId: userId, fullName: fullName }, key, {
      expiresIn: expireTimeIn,
    });
  },

  verifyAccessToken(token: string): boolean {
    try {
      const jwtPayload = jwt.verify(
        token,
        `${process.env.SECRET_KEY}`
      ) as jwt.JwtPayload;
      const expireTime = jwtPayload.exp as number;
      return Date.now() < expireTime * 1000 ? true : false;
    } catch (err) {
      return false;
    }
  },

  getUserIdFromToken(token: string): { userId: string; isVerified: boolean } {
    token = token.split(" ")[1];
    try {
      const jwtPayload = jwt.verify(
        token,
        `${process.env.SECRET_KEY}`
      ) as jwt.JwtPayload;
      return {
        userId: jwtPayload.userId,
        isVerified: true,
      };
    } catch (err) {
      return {
        userId: "",
        isVerified: false,
      };
    }
  },
};
