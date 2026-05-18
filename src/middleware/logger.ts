import type { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();

  const formattedDate = now.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // logger format
  const log = `
==================================================
Date   : ${formattedDate}
Method : ${req.method}
URL    : ${req.url}
IP     : ${req.ip}
==================================================
`;

  // create logs folder automatically
  const logPath = path.join(process.cwd(), "logs.txt");

  fs.appendFile(logPath, log, (error) => {
    if (error) {
      console.error("Logger Error:", error);
    }
  });

  console.log(log);

  next();
};

export default logger;
