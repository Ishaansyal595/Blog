import express from "express";
import { getAllCategory, getCategoryDetails } from "../controller/Category.controller.js";

const PublicCategoryRoutes = express.Router();

PublicCategoryRoutes.get("/", getAllCategory);
PublicCategoryRoutes.get("/:categoryTitle/:categoryId", getCategoryDetails);

export default PublicCategoryRoutes;
