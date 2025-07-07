import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, required: true, trim: true },
  slug: { type: String, unique: true, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
});

const Category = mongoose.model("Category", categorySchema, "categories");
export default Category;
