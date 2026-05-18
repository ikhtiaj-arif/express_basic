import CookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profile/profile.route";
import { userRoutes } from "./modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();
const port = config.port;
const connection_string = config.connection_string;

// this middleware allows to receive request body to json  format
app.use(express.json());
// this middleware allows to receive request body to text  format
app.use(express.text());
// this middleware allows to receive request body to encoded format
//? extended true inside urlencoded allows to receive nested data
app.use(express.urlencoded());
app.use(CookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server running!",
    author: "Ikhtiaj Arif",
    port: port,
  });
});

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);
// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
