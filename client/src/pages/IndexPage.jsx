import { Button } from "@/components/ui/button";
import { getEnv } from "@/helpers/getEnv";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const IndexPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/public/blogs`
        );
        const data = await response.json();

        console.log(data);

        setBlogs(data.blog);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex mb-5">
      <div className="flex flex-wrap justify-center items-center gap-5 w-full max-w-7xl mx-auto">
        {blogs.slice(0, 3).map((data, index) => {
          const imageUrl = `${getEnv("VITE_MEDIA_BASE_URL")}/uploads/${
            data.image
          }`;

          return (
            <div
              key={index}
              className="border border-black h-100 w-85 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between p-4"
            >
              <div className=" relative mb-3 overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt={data.title}
                  className="h-40 w-full object-cover rounded-xl transform hover:scale-105 transition"
                />
                <Button className="absolute bottom-2 left-2">
                  <Link
                    to={`/category/${data.category.title}/${data.category._id}`}
                  >
                    {data.category.title}
                  </Link>
                </Button>
              </div>
              <h4 className="text-lg font-semibold mb-1">{data.title}</h4>

              <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                {data.content}
              </p>
              <div className="mb-1 flex justify-between text-md text-gray-500">
                <p>{new Date(data.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
