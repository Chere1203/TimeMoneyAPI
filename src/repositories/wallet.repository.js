import { db } from "../config/db.js";

export const walletRepository = {
  async getByUserId(userId) {
    const result = await db.query(
      "select user_id, amount from wallet where user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return { user_id: userId, amount: 0 };
    }
    return result.rows[0];
  },

  async save(userId, amount) {
    const existing = await db.query(
      "select user_id from wallet where user_id = $1",
      [userId]
    );
    if (existing.rows.length === 0) {
      const result = await db.query(
        `insert into wallet (user_id, amount)
         values ($1,$2)
         returning user_id, amount`,
        [userId, amount]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        `update wallet
         set amount = $2
         where user_id = $1
         returning user_id, amount`,
        [userId, amount]
      );
      return result.rows[0];
    }
  }
};
