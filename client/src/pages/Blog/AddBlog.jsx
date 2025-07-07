import { Button } from "@/components/ui/button";
import { AllBlogRoute } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { getEnv } from "@/helpers/getEnv";

const AddBlog = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

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

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    category: z.string().min(1, "Category is required"),
    content: z.string().min(1, "Content is required"),
    image: z.any().refine((file) => file instanceof File, {
      message: "Image is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      content: "",
      image: null,
    },
  });

  const addBlogHandler = async (value) => {

    try {
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("author", value.author);
      formData.append("category", value.category);
      formData.append("content", value.content);
      formData.append("image", value.image);
      formData.append("createdAt", new Date().toISOString());

      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blogs/add`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }

      showToast("success", data.message);
      form.reset();
      navigate(AllBlogRoute);
    } catch (error) {
      showToast("error", error.message || "Something went wrong.");
    }
  };

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={form.handleSubmit(addBlogHandler)}
    >
      <div className="p-5 space-y-6 w-2xl flex flex-col items-center shadow-xl bg-sidebar mb-10">
        <div className="flex flex-col w-full max-w-xl gap-2">
          <label className="font-semibold">Title:</label>
          <input
            {...form.register("title")}
            className="border border-black hover:border-primary rounded-md p-1"
            type="text"
            placeholder="Enter your Title"
            required
          />
        </div>

        <div className="flex flex-col w-full max-w-xl gap-2">
          <label className="font-semibold">Author:</label>
          <input
            {...form.register("author")}
            className="border border-black hover:border-primary rounded-md p-1"
            type="text"
            placeholder="Enter the Author Name"
            required
          />
        </div>

        <div className="flex flex-col w-full max-w-xl gap-2">
          <label className="font-semibold">Category:</label>
          <select
            {...form.register("category")}
            className="border border-black hover:border-primary rounded-md p-1"
            required
          >
            <option value="">-- Select the Category --</option>
            {categoryList.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full max-w-xl gap-2">
          <label className="font-semibold">Content:</label>
          <textarea
            rows={4}
            {...form.register("content")}
            placeholder="Enter your blog content"
            className="border border-black hover:border-primary rounded-md p-1"
            required
          />
        </div>

        <div className="flex flex-col w-full max-w-xl gap-2">
          <label className="font-semibold">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => form.setValue("image", e.target.files[0], { shouldValidate: true })}
            className="border border-black hover:border-primary rounded-md p-1"
            required
          />
        </div>

        <Button type="submit" className="w-full max-w-xl">
          Save Blog
        </Button>
      </div>
    </form>
  );
};

export default AddBlog;
