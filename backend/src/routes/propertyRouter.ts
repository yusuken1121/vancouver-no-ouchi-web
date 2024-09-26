import { Router } from "express";
import {
  getProperties,
  getProperty,
  getPropertyPage,
  getSchema,
} from "../controllers/propertyController";

export const router = Router();

router.get("/", getProperties);
// router.get("/page/:pageNumber", getPropertyPage); // Function reserved for future use
router.get("/:propertyId", getProperty);
// router.get("/notion-schema", getSchema); // Function reserved for future use
