import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserDB(req.body);
    sendResponse(res, 200, true, "User Login Successful!", result);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

export const authController = { loginUser };
