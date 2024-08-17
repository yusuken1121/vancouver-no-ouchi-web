import { Router } from "express";
import { handleIndexRequest } from "../controllers/indexController";

export const router = Router();

router.get("/", handleIndexRequest);
