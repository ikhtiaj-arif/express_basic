import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { PORT } from "./config";
const app: Application = express();
const port = 3300;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server running!",
    author: "Ikhtiaj Arif",
    port: PORT,
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
