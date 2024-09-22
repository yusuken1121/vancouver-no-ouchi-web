import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./errors/custom-error";
import cors from "cors";
import { router as indexRouter } from "./routes/indexRouter";
import { router as testRouter } from "./routes/propertyRouter";
import { router as authRouter } from "./routes/authRouter";
import compression from "compression";
import { API_PUBLIC_API_BASEURL } from "./env";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

const routers = [
  { route: "/", controller: indexRouter },
  { route: "/properties", controller: testRouter },
  { route: "/auth", controller: authRouter },
];
routers.forEach((r) => {
  app.use(r.route, r.controller);
});

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
