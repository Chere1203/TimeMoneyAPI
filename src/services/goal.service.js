import { goalRepository } from "../repositories/goal.repository.js";

export const goalService = {
  async get(userId) {
    return await goalRepository.getByUserId(userId);
  },
  async save(userId, data) {
    const goal = {
      name: data.name ?? null,
      time_budget_h: data.time_budget_h ?? null
    };
    return await goalRepository.save(userId, goal);
  }
};
