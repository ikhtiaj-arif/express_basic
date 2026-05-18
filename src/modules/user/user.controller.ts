import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const {
  createUserIntoDB,
  getUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
} = userService;

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

const getUser = async (req: Request, res: Response) => {
  
  try {
    const result = await getUserFromDB();
    sendResponse(res, 200, true, "User Retrieved Successfully!", result.rows);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await getUserByIdFromDB(id as string);

    if (result.rows.length === 0) {
      sendResponse(res, 404, false, "User Not Found!", {});
    }
    sendResponse(
      res,
      200,
      true,
      "User Retrieved Successfully!",
      result.rows[0],
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, password, is_active } = req.body;

  try {
    const result = await updateUserIntoDB(id as string, req.body);

    if (result.rows.length === 0) {
      sendResponse(res, 404, false, "User Not Found!", {});
      //   res
      //     .status(404)
      //     .json({ success: false, message: "User Not Found!", data: {} });
    }
    sendResponse(res, 200, true, "User Updated Successfully!", result.rows[0]);
    // res.status(200).json({
    //   success: true,
    //   message: "User updated successfully!",
    //   data: result.rows[0],
    // });
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
    // res.status(500).json({ success: false, message: error.message, error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUserFromDB(id as string);
    if (result.rowCount === 0) {
      sendResponse(res, 404, false, "User Not Found!", {});
    }
    sendResponse(res, 200, true, "User Deleted Successfully!", result.rows[0]);
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

export const userController = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
