import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();
const { loginUser } = authController;

router.post("/login", loginUser);

export const authRoute = router;
