import type { Request, Response } from "express";
import { pool } from "../../db";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const { createUserIntoDB } = userService;

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email, age, password } = req.body;

  try {
    const result = await createUserIntoDB(req.body);
    sendResponse(res, 201, true, "User Created Successfully!", result.rows[0]);
  
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

export const userController = { createUser };
