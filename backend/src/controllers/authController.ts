import { Client } from "@notionhq/client";
import { NOTION_KEY } from "../env";

export const notion = new Client({
  auth: NOTION_KEY,
});

export const verifyNotionToken = async () => {
  try {
    const response = await notion.users.me({});
    console.log("Notion Integration Key is valid.");
    console.log("User Info:", response);
  } catch (error) {
    console.error("Invalid Notion Integration Key or other error:", error);
  }
};
