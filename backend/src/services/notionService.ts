import axios from "axios";
import { NOTION_DATABASE_ID } from "../env";
import apiClient from "../config/apiClient";

export const getNotionSchema = async () => {
  try {
    const response = await apiClient.get(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`
    );
    return response.data.properties;
  } catch (error) {
    throw new Error(`Error fetching Notion database schema: ${error}`);
  }
};
