import { type NextFunction, type Request, type Response } from "express";
import { sendResponse } from "../utils/sendResponse";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      sendResponse(res, 401, false, "Unauthorized access!!", {});
    }
    next();
  };
};

export default auth;
