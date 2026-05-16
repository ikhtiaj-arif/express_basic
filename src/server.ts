import app from "./app";
import config from "./config";
import { dbInit } from "./db";

const port = config.port;

const main = () => {
  dbInit();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
