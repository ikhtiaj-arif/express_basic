import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();
const { createUser, getUser, getUserById, updateUser, deleteUser } =
  userController;

router.post("/", createUser);
router.get("/", auth("admin", "agent"), getUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRoutes = router;
