import { Router } from "express";
import {
  getAllProperties, // over then 100
  // getProperties, // less than 100
  getProperty,
  // getPropertyPage,
  // getSchema,
} from "../controllers/propertyController";

export const router = Router();

// router.get("/", getProperties);
router.get("/", getAllProperties);
// router.get("/page/:pageNumber", getPropertyPage); // Function reserved for future use
router.get("/:propertyId", getProperty);
// router.get("/notion-schema", getSchema); // Function reserved for future use
