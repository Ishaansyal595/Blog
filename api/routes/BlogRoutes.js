import express from "express";
import {
  updateBlog,
  addBlog,
} from "../controller/Blog.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import upload from "../config/multer.js";

const BlogRoutes = express.Router();

BlogRoutes.post("/add", isAdmin, upload.single("image"), addBlog);
BlogRoutes.put("/update/:blogId", updateBlog);

export default BlogRoutes;
