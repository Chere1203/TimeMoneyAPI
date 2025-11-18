import { prefsService } from "../services/prefs.service.js";

/**
 * @swagger
 * tags:
 *   name: Prefs
 *   description: Preferencias de tiempo y moneda
 */

export const prefsController = {
  /**
   * @swagger
   * /api/prefs:
   *   get:
   *     summary: Obtener preferencias del usuario
   *     tags: [Prefs]
   *     security:
   *       - bearerAuth: []
   */
  async get(req, res) {
    const prefs = await prefsService.get(req.user.id);
    res.json(prefs);
  },

  /**
   * @swagger
   * /api/prefs:
   *   put:
   *     summary: Actualizar preferencias del usuario
   *     tags: [Prefs]
   *     security:
   *       - bearerAuth: []
   */
  async update(req, res) {
    const prefs = await prefsService.update(req.user.id, req.body);
    res.json(prefs);
  }
};
