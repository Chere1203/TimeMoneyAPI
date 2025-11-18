import { expensesService } from "../services/expenses.service.js";

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Gestión de gastos
 */

export const expensesController = {
  /**
   * @swagger
   * /api/expenses:
   *   get:
   *     summary: Listar gastos del usuario
   *     tags: [Expenses]
   *     security:
   *       - bearerAuth: []
   */
  async list(req, res) {
    const items = await expensesService.list(req.user.id);
    res.json(items);
  },

  /**
   * @swagger
   * /api/expenses:
   *   post:
   *     summary: Crear un gasto
   *     tags: [Expenses]
   *     security:
   *       - bearerAuth: []
   */
  async create(req, res) {
    const { description, amount, category, date } = req.body;
    if (!description || !amount || !category || !date) {
      return res
        .status(400)
        .json({ error: "description, amount, category y date son requeridos" });
    }
    try {
      const item = await expensesService.create(req.user.id, {
        description,
        amount,
        category,
        date
      });
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: "Error al crear gasto" });
    }
  },

  /**
   * @swagger
   * /api/expenses/{id}:
   *   get:
   *     summary: Obtener un gasto por id
   *     tags: [Expenses]
   *     security:
   *       - bearerAuth: []
   */
  async get(req, res) {
    const item = await expensesService.get(req.user.id, req.params.id);
    if (!item) return res.status(404).json({ error: "No encontrado" });
    res.json(item);
  },

  /**
   * @swagger
   * /api/expenses/{id}:
   *   put:
   *     summary: Actualizar un gasto
   *     tags: [Expenses]
   *     security:
   *       - bearerAuth: []
   */
  async update(req, res) {
    const { description, amount, category, date } = req.body;
    const updated = await expensesService.update(req.user.id, req.params.id, {
      description,
      amount,
      category,
      date
    });
    if (!updated) return res.status(404).json({ error: "No encontrado" });
    res.json(updated);
  },

  /**
   * @swagger
   * /api/expenses/{id}:
   *   delete:
   *     summary: Eliminar un gasto
   *     tags: [Expenses]
   *     security:
   *       - bearerAuth: []
   */
  async remove(req, res) {
    const ok = await expensesService.remove(req.user.id, req.params.id);
    if (!ok) return res.status(404).json({ error: "No encontrado" });
    res.status(204).send();
  }
};
