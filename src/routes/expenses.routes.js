import { Router } from "express";
import { expensesController } from "../controllers/expenses.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authRequired, expensesController.list);
router.post("/", authRequired, expensesController.create);
router.get("/:id", authRequired, expensesController.get);
router.put("/:id", authRequired, expensesController.update);
router.delete("/:id", authRequired, expensesController.remove);

export default router;
