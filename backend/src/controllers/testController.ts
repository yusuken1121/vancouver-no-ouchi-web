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

export const postTestDb = async (req: Request, res: Response) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID! },

      properties: {
        Checkbox1: {
          type: "checkbox",
          checkbox: true,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: "test3",
              },
            },
          ],
        },
        Status: {
          type: "status",
          status: {
            name: "Done",
          },
        },
      },
    });
    res.status(200).json({ message: "Data added successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
};
