import { Router } from "express";
import {
  getProperties,
  getProperty,
  getSchema,
} from "../controllers/propertyController";

export const router = Router();

router.get("/", getProperties);
router.get("/:propertyId", getProperty);
router.get("/notion-schema", getSchema);
