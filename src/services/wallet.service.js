import { walletRepository } from "../repositories/wallet.repository.js";

export const walletService = {
  async get(userId) {
    return await walletRepository.getByUserId(userId);
  },
  async save(userId, amount) {
    return await walletRepository.save(userId, amount);
  }
};
