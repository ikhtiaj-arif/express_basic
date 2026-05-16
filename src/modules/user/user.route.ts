import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { sendResponse } from "../../utils/sendResponse";
import { userController } from "./user.controller";

const router = Router();
const { createUser, getUser, getUserById,  updateUser,deleteUser} = userController;

router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRoutes = router;
