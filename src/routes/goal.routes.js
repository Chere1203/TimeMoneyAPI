import { Router } from "express";
import { goalController } from "../controllers/goal.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authRequired, goalController.get);
router.put("/", authRequired, goalController.save);

export default router;
