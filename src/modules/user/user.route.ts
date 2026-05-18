import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();
const { createUser, getUser, getUserById, updateUser, deleteUser } =
  userController;

router.post("/", createUser);
router.get("/", auth(), getUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRoutes = router;
