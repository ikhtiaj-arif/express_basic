import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import { sendResponse } from "../utils/sendResponse";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      sendResponse(res, 401, false, "Unauthorized access!", {});
    }

    const decoded = jwt.verify(
      token as string,
      config.jwtSecret as string,
    ) as JwtPayload;
    console.log(decoded);
    const userData = await pool.query(
      `
        SELECT * FROM users WHERE email=$1  
        `,
      [decoded.email],
    );
    const user = userData.rows[0];
    if (userData.rows.length === 0) {
      sendResponse(res, 404, false, "User Not Found!", {});
    }
    if(!user.is_active){
          sendResponse(res, 403, false, "Forbidden!", {});
    }
    console.log(user);

    next();
  };
};

export default auth;
