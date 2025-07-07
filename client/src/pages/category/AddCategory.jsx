import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { getEnv } from "@/helpers/getEnv";
import { AllCategoryRoute } from "@/helpers/RouteName";
import { useNavigate } from "react-router";
import { showToast } from "@/helpers/showToast";

const AddCategory = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    image: z.any().refine((file) => file instanceof File, {
      message: "Image is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    const categoryName = form.watch("title");
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  });

  const addCategoryHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      formData.append("image", values.image); // ✅ append File object

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/add`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        return showToast("error", resData.message);
      }

      showToast("success", resData.message);
      form.reset();
      navigate(AllCategoryRoute);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={form.handleSubmit(addCategoryHandler)}
    >
      {/* Title */}
      <div className=" p-5 space-y-6 w-2xl h-70 flex flex-col items-center shadow-xl bg-sidebar">
        <div className="flex flex-col w-xl gap-2">
          <label className="font-semibold">Title: </label>
          <input
            {...form.register("title")}
            className="border border-black hover:border-primary rounded-md p-1"
            type="text"
            // value={blogData.title}
            // onChange={handleChange}
            placeholder="Enter your Title"
            required
          />
        </div>

        <div className="flex flex-col w-xl gap-2">
          <label className="font-semibold">Slug: </label>
          <input
            className="border border-black hover:border-primary rounded-md p-1"
            {...form.register("slug")}
            placeholder="Enter your Slug"
            required
          />
        </div>

        <div className="flex flex-col w-xl gap-2">
          <label className="font-semibold">Description: </label>
          <textarea
            row={4}
            {...form.register("description")}
            placeholder={`Enter Your Description`}
            className="border border-black hover:border-primary rounded-md p-1"
            required
          />
        </div>

        <div className="flex flex-col w-xl gap-2">
          <label className="font-semibold">Image: </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => form.setValue("image", e.target.files[0])}
            className="border border-black hover:border-primary rounded-md p-1"
            required
          />
        </div>

        <Button type="submit" className="w-xl">
          Save Category
        </Button>
      </div>{" "}
    </form>
  );
};

export default AddCategory;
