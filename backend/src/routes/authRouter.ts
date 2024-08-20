import { Router } from "express";
import { verifyNotionToken } from "../controllers/authController";

export const router = Router();

router.get("/", verifyNotionToken);
