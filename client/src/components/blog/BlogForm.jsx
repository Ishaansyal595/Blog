import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getEnv } from "@/helpers/getEnv";

const BlogForm = () => {
  const [categoryList, setCategoryList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/public/category`
        );
        const data = await response.json();
        setCategoryList(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/public/send-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      console.log(result);

      if (result.success) {
        alert("Request sent successfully!");
        setFormData({
          name: "",
          email: "",
          title: "",
          category: "",
          description: "",
        });
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Error submitting blog request:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow-xl rounded-md bg-white mb-10">
      <h2 className="text-2xl font-semibold mb-4">Request a Blog</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-4">
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 p-2 rounded-full"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 p-2 rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          {/* Title */}
          <div className="w-full">
            <label htmlFor="title" className="block font-medium mb-1">
              Blog Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the blog title"
              required
              className="w-full border border-gray-300 p-2 rounded-full"
            />
          </div>

          {/* Category */}
          <div className="w-full">
            <label htmlFor="category" className="block font-medium mb-1">
              Category:
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleSelectChange}
              required
              className="w-full border border-gray-300 p-2 rounded-full"
            >
              <option value="">-- Select a category --</option>
              {categoryList.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a detailed description"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="4"
          ></textarea>
        </div>

        {/* Submit */}
        <Button type="submit" className="text-white py-2 px-4 rounded-md">
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
