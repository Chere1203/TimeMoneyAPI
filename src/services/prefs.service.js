import { prefsRepository } from "../repositories/prefs.repository.js";

export const prefsService = {
  async get(userId) {
    return await prefsRepository.getByUserId(userId);
  },

  async update(userId, data) {
    const current = await prefsRepository.getByUserId(userId);
    const merged = {
      ...current,
      rate: data.rate ?? current.rate,
      currency: data.currency ?? current.currency,
      hours_per_week: data.hours_per_week ?? current.hours_per_week,
      tax_adj: data.tax_adj ?? current.tax_adj
    };
    return await prefsRepository.save(userId, merged);
  }
};
