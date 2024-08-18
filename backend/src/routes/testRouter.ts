import { Router } from "express";
import { getTestDb, postTestDb } from "../controllers/testController";

export const router = Router();

router.get("/", getTestDb);
router.post("/", postTestDb);
