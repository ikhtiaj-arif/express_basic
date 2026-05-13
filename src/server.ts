import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 3300;

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Express Server running!", author: "Ikhtiaj Arif" });
});

// this middleware allows to receive request body from buffer to json
app.use(express.json())

app.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
