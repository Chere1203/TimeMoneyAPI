import dotenv from "dotenv";
dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "super-secret-time-is-money",
  expiresIn: "2h"
};
