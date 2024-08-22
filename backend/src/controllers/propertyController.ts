import { Request, Response } from "express";
import { notion } from "../config/config";
import { NOTION_DATABASE_ID } from "../env";
import { getNotionSchema } from "../services/notionService";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getProperties = async (req: Request, res: Response) => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID!,
    });

    res.json(response.results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProperty = async (req: Request, res: Response) => {
  const { propertyId } = req.params;
  if (!propertyId) {
    return res.status(400).send("Property ID is required");
  }
  try {
    const response = await notion.pages.retrieve({
      page_id: propertyId,
    });

    const page = response as PageObjectResponse;
    // console.log(page.properties["ステータス"]);　// プロパティの取得方法

    res.status(200).json(page);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getSchema = async (req: Request, res: Response) => {
  try {
    const notionSchema = await getNotionSchema();
    res.status(200).json(notionSchema);
  } catch (error) {
    console.error("cannot get the notion schema", error);
    res.status(401).json({ message: "cannot get the schema" });
  }
};
