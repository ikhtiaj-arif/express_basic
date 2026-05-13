import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";

const app: Application = express();
const port = config.port;
const connection_string = config.connection_string;

const pool = new Pool({
  connectionString: connection_string,
});

const dbInit = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
  }
};
dbInit();

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

app.post("/", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email } = req.body;
  res.status(201).json({ message: "Created", data: { name, email } });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
