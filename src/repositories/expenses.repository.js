import { db } from "../config/db.js";
import crypto from "crypto";

export const expensesRepository = {
  async create(userId, data) {
    const id = crypto.randomUUID();
    const result = await db.query(
      `insert into expenses (id, user_id, description, amount, category, date)
       values ($1,$2,$3,$4,$5,$6)
       returning *`,
      [id, userId, data.description, data.amount, data.category, data.date]
    );
    return result.rows[0];
  },

  async findAll(userId) {
    const result = await db.query(
      `select * from expenses
       where user_id = $1
       order by date desc, created_at desc`,
      [userId]
    );
    return result.rows;
  },

  async findById(userId, id) {
    const result = await db.query(
      `select * from expenses where user_id = $1 and id = $2`,
      [userId, id]
    );
    return result.rows[0] || null;
  },

  async update(userId, id, data) {
    const result = await db.query(
      `update expenses
       set description = $3,
           amount = $4,
           category = $5,
           date = $6
       where user_id = $1 and id = $2
       returning *`,
      [userId, id, data.description, data.amount, data.category, data.date]
    );
    return result.rows[0] || null;
  },

  async remove(userId, id) {
    const result = await db.query(
      `delete from expenses
       where user_id = $1 and id = $2`,
      [userId, id]
    );
    return result.rowCount > 0;
  }
};
