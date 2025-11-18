import { goalService } from "../services/goal.service.js";

/**
 * @swagger
 * tags:
 *   name: Goal
 *   description: Meta mensual de tiempo
 */

export const goalController = {
  /**
   * @swagger
   * /api/goal:
   *   get:
   *     summary: Obtener meta de tiempo del usuario
   *     tags: [Goal]
   *     security:
   *       - bearerAuth: []
   */
  async get(req, res) {
    const goal = await goalService.get(req.user.id);
    res.json(goal);
  },

  /**
   * @swagger
   * /api/goal:
   *   put:
   *     summary: Actualizar meta de tiempo del usuario
   *     tags: [Goal]
   *     security:
   *       - bearerAuth: []
   */
  async save(req, res) {
    const goal = await goalService.save(req.user.id, req.body);
    res.json(goal);
  }
};
