import { db } from "../config/db.js";

export const goalRepository = {
  async getByUserId(userId) {
    const result = await db.query(
      "select user_id, name, time_budget_h from goal where user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return { user_id: userId, name: null, time_budget_h: null };
    }
    return result.rows[0];
  },

  async save(userId, goal) {
    const existing = await db.query(
      "select user_id from goal where user_id = $1",
      [userId]
    );
    if (existing.rows.length === 0) {
      const result = await db.query(
        `insert into goal (user_id, name, time_budget_h)
         values ($1,$2,$3)
         returning user_id, name, time_budget_h`,
        [userId, goal.name, goal.time_budget_h]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        `update goal
         set name = $2,
             time_budget_h = $3
         where user_id = $1
         returning user_id, name, time_budget_h`,
        [userId, goal.name, goal.time_budget_h]
      );
      return result.rows[0];
    }
  }
};
