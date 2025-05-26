import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/v1/register", AuthController.register);
router.post("/v1/login", AuthController.login);

export default router;