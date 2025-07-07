import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { Button } from "@/components/ui/button";
import { BlogDetailsRoute } from "@/helpers/RouteName";
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  const { categoryTitle, categoryId } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${getEnv(
            "VITE_API_BASE_URL"
          )}/public/blogs/category/${categoryTitle}/${categoryId}`
        );
        const data = await res.json();

        setBlogs(data.blogs);
      } catch (err) {
        console.error("Error fetching category blogs:", err);
      }
    };

    fetchBlogs();
  }, [categoryTitle, categoryId]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">
        Blogs in Category: {categoryTitle}
      </h2>
      <div className="flex flex-wrap gap-5 justify-center">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((data, index) => {

            const imageUrl = `${getEnv(
              "VITE_MEDIA_BASE_URL"
            )}/uploads/${data.image}`;
            return (
              <div
                key={index}
                className="w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col p-4"
              >
                <img
                  src={imageUrl}
                  alt={data.title}
                  className="h-40 w-full object-cover rounded-xl mb-3"
                />
                <h4 className="text-lg font-semibold">{data.title}</h4>
                <p className="text-sm text-gray-500 mb-2">By {data.author}</p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {data.content}
                </p>
                <Button className="mt-3">
                  <Link
                    to={BlogDetailsRoute({ title: data.title, id: data._id })}
                  >
                    Read More
                  </Link>
                </Button>
              </div>
            );
          })
        ) : (
          <p>No blogs found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
