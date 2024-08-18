import { Request, Response } from "express";
import { notion } from "../config/config";
import { NOTION_DATABASE_ID } from "../env";

export const getTestDb = async (req: Request, res: Response) => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID!,
    });
    res.json(response.results);
  } catch (error) {
    res.status(500).send(error);
  }
};
