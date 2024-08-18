import { Router } from "express";
import { getTestDb } from "../controllers/testController";

export const router = Router();

router.get("/", getTestDb);
