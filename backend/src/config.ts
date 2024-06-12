import dotenv from "dotenv";

dotenv.config();

export const saltRounds = 10;
export const expireTimeIn: string = "8h";
export const expireTimeIfRememberMe: string = "7d";
export const sessionClearTime: { count: number; type: string } = {
  count: 1,
  type: "day",
};
