import { db } from "../config/db.js";

export const prefsRepository = {
  async getByUserId(userId) {
    const result = await db.query(
      "select user_id, rate, currency, hours_per_week, tax_adj from prefs where user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      // crear por defecto
      const def = {
        user_id: userId,
        rate: 0,
        currency: "CRC",
        hours_per_week: 40,
        tax_adj: 13
      };
      await db.query(
        `insert into prefs (user_id, rate, currency, hours_per_week, tax_adj)
         values ($1,$2,$3,$4,$5)`,
        [userId, def.rate, def.currency, def.hours_per_week, def.tax_adj]
      );
      return def;
    }
    return result.rows[0];
  },

  async save(userId, prefs) {
    const result = await db.query(
      `update prefs
       set rate = $2,
           currency = $3,
           hours_per_week = $4,
           tax_adj = $5
       where user_id = $1
       returning user_id, rate, currency, hours_per_week, tax_adj`,
      [
        userId,
        prefs.rate,
        prefs.currency,
        prefs.hours_per_week,
        prefs.tax_adj
      ]
    );
    return result.rows[0];
  }
};
