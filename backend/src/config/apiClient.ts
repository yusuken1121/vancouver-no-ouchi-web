import axios from "axios";
import { NOTION_DATABASE_ID, NOTION_KEY } from "../env";

const apiClient = axios.create({
  baseURL: `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`, // API for notion
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${NOTION_KEY}`,
    "Notion-Version": "2022-06-22",
  },
});

export default apiClient;
