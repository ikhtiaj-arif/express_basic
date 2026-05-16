import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();
const { createProfile } = profileController;

router.post("/",createProfile);

export const profileRoute = router;
