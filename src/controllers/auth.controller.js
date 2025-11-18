import { authService } from "../services/auth.service.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

export const authController = {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuario creado
   *       409:
   *         description: Email ya registrado
   */
  async register(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email y password son requeridos" });
    try {
      const user = await authService.register(email, password);
      res.status(201).json(user);
    } catch (err) {
      if (err.message === "EMAIL_IN_USE") {
        return res.status(409).json({ error: "Email ya registrado" });
      }
        console.error("🔥 ERROR EN REGISTRO:", err);
        res.status(500).json({ error: "Error en registro" });
    }
  },

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: JWT devuelto
   *       401:
   *         description: Credenciales inválidas
   */
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email y password son requeridos" });
    try {
      const out = await authService.login(email, password);
      res.json(out);
    } catch (err) {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  },

  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     summary: Obtener usuario autenticado
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Usuario actual
   */
  async me(req, res) {
    try {
      const user = await authService.me(req.user.id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  }
};
