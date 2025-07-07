import mongoose from "mongoose";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";

export const addBlog = async (req, res, next) => {
  try {
    const { title, category, author, createdAt, content } = req.body;

    const imagePath = req.file.path;

    const blog = new Blog({
      title,
      category: new mongoose.Types.ObjectId(category),
      createdAt,
      author,
      image: imagePath,
      content,
    });

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog added successfully!",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogDetail = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId })
      .populate("category", "title")
      .lean()
      .exec();

    if (!blog) {
      return next(handleError(404, "Blog not Found!"));
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find().populate("category", "title").sort({ createdAt: -1 }).lean().exec();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const blogs = await Blog.find({ category: categoryId })
      .populate("category", "title")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!blogs || blogs.length === 0) {
      return next(handleError(404, "No blogs found in this category."));
    }

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const searchBlog = async (req, res, next) => {
  try {
    const { title } = req.query;
    console.log("Title ", title);

    if (!title) {
      return next(handleError(400, "Search title is required"));
    }

    const blogs = await Blog.find({
      title: { $regex: title, $options: "i" },
    }).populate("category", "title");

    if (!blogs || blogs.length === 0) {
      return next(handleError(404, "Blog not Found!"));
    }

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const removeBlog = async (req, res, next) => {};
