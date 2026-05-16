import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { sendResponse } from "../../utils/sendResponse";
import { userController } from "./user.controller";

const router = Router();
const { createUser } = userController;
router.post("/", createUser);

export const userRoutes = router;
