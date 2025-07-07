import { getEnv } from "@/helpers/getEnv";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogsDetail = () => {
  const { title, id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/public/blogs/${title}/${id}`
        );

        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, []);

  if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

  const imageUrl = `${getEnv("VITE_MEDIA_BASE_URL")}/uploads/${blog.image}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 border-b pb-4">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{blog.title}</h2>
        <p className="text-sm text-gray-500">
          {blog.author} | {new Date(blog.createdAt).toLocaleDateString()} |{" "}
          {blog.category.title}
        </p>
        <p className="mt-4 text-gray-700 whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsDetail;
