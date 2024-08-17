import { Request, Response } from "express";

export const handleIndexRequest = (req: Request, res: Response) => {
  res.status(200).json({ message: "index router" });
};
