import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { jwtConfig } from "../config/jwt.config.js";

export const authService = {
  async register(email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error("EMAIL_IN_USE");
    const hash = await bcrypt.hash(password, 10);
    const user = await userRepository.create(email, hash);
    return { id: user.id, email: user.email };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("INVALID_CREDENTIALS");
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error("INVALID_CREDENTIALS");

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return {
      token,
      user: { id: user.id, email: user.email }
    };
  },

  async me(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("NOT_FOUND");
    return user;
  }
};
