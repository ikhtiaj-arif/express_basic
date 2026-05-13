import dotenv from "dotenv";

dotenv.config({ path: "/custom/path/to/.env" });

export const PORT = process.env.PORT || 3300;
