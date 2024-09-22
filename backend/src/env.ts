import { config } from "dotenv";
import path from "path";

export const ENV = process.env.NODE_ENV || "development";
export const PATH = path.join(__dirname, `../.env.${ENV}`);

config({ path: PATH });
export const NOTION_KEY = process.env.NOTION_KEY;
export const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
export const API_PUBLIC_BASEURL = process.env.API_PUBLIC_API_BASEURL || "";
export const PORT = process.env.PORT || 3000;
