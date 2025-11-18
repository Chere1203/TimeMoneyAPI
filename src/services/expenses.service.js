import { expensesRepository } from "../repositories/expenses.repository.js";

export const expensesService = {
  async list(userId) {
    return await expensesRepository.findAll(userId);
  },
  async create(userId, data) {
    return await expensesRepository.create(userId, data);
  },
  async get(userId, id) {
    return await expensesRepository.findById(userId, id);
  },
  async update(userId, id, data) {
    return await expensesRepository.update(userId, id, data);
  },
  async remove(userId, id) {
    return await expensesRepository.remove(userId, id);
  }
};
