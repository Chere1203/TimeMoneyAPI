import { db } from "../config/db.js";
import crypto from "crypto";

export const userRepository = {
  async create(email, passwordHash) {
    const id = crypto.randomUUID();
    const result = await db.query(
      `insert into users (id, email, password_hash)
       values ($1,$2,$3)
       returning id, email, created_at`,
      [id, email, passwordHash]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query(
      "select * from users where email = $1",
      [email]
    );
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await db.query(
      "select id, email, created_at from users where id = $1",
      [id]
    );
    return result.rows[0] || null;
  }
};
