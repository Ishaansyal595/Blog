import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // 👈 this MUST match your Category model name
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
