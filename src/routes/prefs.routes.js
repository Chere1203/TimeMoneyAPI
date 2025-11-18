import { Router } from "express";
import { prefsController } from "../controllers/prefs.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authRequired, prefsController.get);
router.put("/", authRequired, prefsController.update);

export default router;
