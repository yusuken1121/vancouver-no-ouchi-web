import { Request, Response } from "express";
import { notion } from "../config/config";
import { NOTION_DATABASE_ID } from "../env";
import { getNotionSchema } from "../services/notionService";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Fetching less than 100 data
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

//　Fetching over 100 data, but it hasn’t been tested yet.
export const getAllProperties = async (req: Request, res: Response) => {
  let allResults: any[] = [];
  let hasMore = true;
  let nextCursor: string | undefined = undefined;
  try {
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID!,
        start_cursor: nextCursor,
        page_size: 100,
      });
      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor || undefined;
    }

    res.json(allResults);
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

// Fetching the data per page
export const getPropertyPage = async (req: Request, res: Response) => {
  const { pageNumber } = req.params;
  const pageSize = 20;
  try {
    let hasMore = true;
    let nextCursor: string | null = null;
    let results: any[] = [];
    for (let i = 1; i < Number(pageNumber); i++) {
      if (!hasMore) break;
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID!,
        page_size: pageSize,
        start_cursor: nextCursor || undefined,
      });
      nextCursor = response.next_cursor;
      hasMore = response.has_more;
    }
    if (hasMore) {
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID!,
        page_size: pageSize,
        start_cursor: nextCursor || undefined,
      });
      results = response.results;
    }
    res.status(200).json(results);
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
