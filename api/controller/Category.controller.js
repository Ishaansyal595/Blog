import { handleError } from "../helpers/handleError.js";
import Category from "./../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { title, slug, description } = req.body;
    const imagePath = req.file?.path; // uploaded image file path

    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const category = new Category({
      title,
      slug,
      description,
      image: imagePath,
    });


    await category.save();

    res.status(200).json({
      success: true,
      message: "Category added successfully!",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getCategoryDetails = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId }).lean().exec();

    if (!category) {
      return next(handleError(404, "Category not Found!"));
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);

    const { categoryID } = req.params;

    const category = await Category.findById(categoryID);
  } catch (error) {
    console.log(error);
  }
};

export const removeCategory = async (req, res, next) => {};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().lean().exec();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
