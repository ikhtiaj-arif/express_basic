import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();
const { loginUser, refreshToken } = authController;

router.post("/login", loginUser);
router.post("/refresh-token",refreshToken )

export const authRoute = router;
