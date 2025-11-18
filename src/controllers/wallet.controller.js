import { walletService } from "../services/wallet.service.js";

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Cartera del usuario
 */

export const walletController = {
  /**
   * @swagger
   * /api/wallet:
   *   get:
   *     summary: Obtener cartera del usuario
   *     tags: [Wallet]
   *     security:
   *       - bearerAuth: []
   */
  async get(req, res) {
    const wallet = await walletService.get(req.user.id);
    res.json(wallet);
  },

  /**
   * @swagger
   * /api/wallet:
   *   put:
   *     summary: Actualizar cartera del usuario
   *     tags: [Wallet]
   *     security:
   *       - bearerAuth: []
   */
  async save(req, res) {
    const { amount } = req.body;
    if (amount == null) {
      return res.status(400).json({ error: "amount es requerido" });
    }
    const wallet = await walletService.save(req.user.id, amount);
    res.json(wallet);
  }
};
