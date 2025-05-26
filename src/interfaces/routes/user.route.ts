import { Router } from "express";
const { authorize } = require("../middlewares/authorize");
import { UserController } from "../controllers/user.controller";

const router = Router();
router.get("/v1/list", authorize(["admin"]), UserController.list);
router.get("/v1/show", authorize(["admin", "user"]), UserController.show);
router.put("/v1/update", authorize(["admin", "user"]), UserController.update);

export default router;