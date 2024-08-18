import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./errors/custom-error";
import cors from "cors";
import { router as indexRouter } from "./routes/indexRouter";
import { router as testRouter } from "./routes/testRouter";

import { NOTION_DATABASE_ID, NOTION_KEY, PORT } from "./env";
import { notion } from "./config/config";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", indexRouter);

app.use("/test", testRouter);

app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `Not Found Route - ${req.method} ${req.path}` });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error);
  }
});
