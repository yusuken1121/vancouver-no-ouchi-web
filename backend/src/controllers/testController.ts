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
  const { title, selectedValue, date } = req.body;
  console.log(
    "title: ",
    title,
    "selectedValue: ",
    selectedValue,
    "date: ",
    date
  );

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
                content: title,
              },
            },
          ],
        },
        Status: {
          type: "status",
          status: {
            name: selectedValue,
          },
        },
        Date: {
          date: {
            start: date,
            // end: "2024-08-20",
            time_zone: null,
          },
        },
      },
    });
    res.status(200).json({ message: "Data added successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
};
