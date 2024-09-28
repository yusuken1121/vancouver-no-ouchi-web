import { Request, Response } from "express";
import { notion } from "../config/config";
import { NOTION_DATABASE_ID } from "../env";
import { getNotionSchema } from "../services/notionService";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { isFullPage } from "@notionhq/client";

// helper function
// delete the unnecessary properties
function removeUnnecessaryProperties(page: PageObjectResponse) {
  const {
    cover,
    icon,
    created_by,
    last_edited_by,
    url,
    public_url,
    in_trash,
    archived,
    parent,
    created_time,
    last_edited_time,
    ...restPage
  } = page;

  const {
    顧客データ: _customerData,
    住所: _address,
    管理会社: _managementCompany,
    ...restProperties
  } = page.properties;

  return {
    ...restPage,
    properties: restProperties,
  };
}

// Fetching less than 100 data
export const getProperties = async (req: Request, res: Response) => {
  // const today = new Date().toISOString().split("T")[0];　// get the today's date

  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: NOTION_DATABASE_ID!,
      filter: {
        property: "ステータス",
        status: {
          does_not_equal: "休止中",
        },
      },
    });

    const data = response.results.map((page) => {
      if (isFullPage(page)) {
        return removeUnnecessaryProperties(page);
      }
      return page;
    });

    res.json(data);
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
        filter: {
          property: "ステータス",
          status: {
            does_not_equal: "休止中",
          },
        },
        start_cursor: nextCursor,
        page_size: 100,
      });
      const filteredResults = response.results.map((page) => {
        if (isFullPage(page)) {
          return removeUnnecessaryProperties(page);
        }
        return page;
      });
      allResults = allResults.concat(filteredResults);
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

    if (!isFullPage(response)) {
      return res.status(400).send("Not a full page");
    }
    const page = removeUnnecessaryProperties(response);
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
      results = response.results.map((page) => {
        if (isFullPage(page)) {
          return removeUnnecessaryProperties(page);
        }
        return page;
      });
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
