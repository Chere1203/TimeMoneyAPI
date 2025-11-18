import { Router } from "express";
import { walletController } from "../controllers/wallet.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authRequired, walletController.get);
router.put("/", authRequired, walletController.save);

export default router;
