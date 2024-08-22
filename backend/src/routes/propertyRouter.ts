import { Router } from "express";
import {
  getSchema,
  getTestDb,
  postTestDb,
} from "../controllers/testController";

export const router = Router();

router.get("/", getTestDb);
router.get("/notion-schema", getSchema);
router.post("/", postTestDb);
