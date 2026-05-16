import type { Response, Request } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { profileService } from "./profile.service";

const { cerateProfileIntoDB } = profileService;

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await cerateProfileIntoDB(req.body);

    sendResponse(
      res,
      201,
      true,
      "Profile Created Successfully!",
      result.rows[0],
    );
  } catch (error: any) {
    sendResponse(res, 500, false, error.message, error);
  }
};

export const profileController = { createProfile };
