import express from "express";
import { getAllBlog, getBlogDetail, getBlogsByCategory, searchBlog } from "../controller/Blog.controller.js";

const PublicBlogRoutes = express.Router();

PublicBlogRoutes.get("/", getAllBlog);
PublicBlogRoutes.get("/:blogTitle/:blogId", getBlogDetail);
PublicBlogRoutes.get("/category/:categoryTitle/:categoryId", getBlogsByCategory);
PublicBlogRoutes.get("/search", searchBlog)


export default PublicBlogRoutes;
