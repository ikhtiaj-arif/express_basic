import express, {
  response,
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
import { sendResponse } from "./utils/sendResponse";
import { dbInit, pool } from "./db";
import { userRoutes } from "./modules/user/user.route";
import { profile } from "node:console";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();
const port = config.port;
const connection_string = config.connection_string;




app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server running!",
    author: "Ikhtiaj Arif",
    port: port,
  });
});

// this middleware allows to receive request body to json  format
app.use(express.json());
// this middleware allows to receive request body to text  format
app.use(express.text());
// this middleware allows to receive request body to encoded format
//? extended true inside urlencoded allows to receive nested data
app.use(express.urlencoded());

app.use('/api/users', userRoutes)
app.use('/api/profile', profileRoute)
app.use('/api/auth', authRoute)







export default app
