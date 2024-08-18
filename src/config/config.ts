import { Client } from "@notionhq/client";
import { NOTION_KEY } from "../env";

export const notion = new Client({
  auth: NOTION_KEY,
});
