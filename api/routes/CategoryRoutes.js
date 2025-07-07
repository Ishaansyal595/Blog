import express from "express";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import {
  addCategory,
  removeCategory,
  updateCategory,
} from "../controller/Category.controller.js";
import upload from "../config/multer.js";

const CategoryRoutes = express.Router();

CategoryRoutes.post("/add", isAdmin, upload.single("image"), addCategory);
CategoryRoutes.put("/update/:categoryId", isAdmin, updateCategory);
CategoryRoutes.delete("/remove/:categoryId", isAdmin, removeCategory);

export default CategoryRoutes;
