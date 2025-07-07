import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getEnv } from "./../../helpers/getEnv";
import { Button } from "@/components/ui/button";
import { BlogDetailsRoute } from "@/helpers/RouteName";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const SearchBlogs = () => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const title = searchParams.get("title");

  useEffect(() => {
    const fetchSearchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/public/blogs/search?title=${title}`
        );

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Something went wrong");
        }

        setBlogs(data.blogs);
        setError("");
      } catch (err) {
        setError(err.message);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchSearchBlogs();
    }
  }, [title]);

  return (
    <div className="p-5 -mt-10 ">
      <h2 className="text-2xl font-semibold mb-4">
        Search Blogs for "{title}"
      </h2>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}

      {blogs.length === 0 && !loading && !error && <p>No blogs found.</p>}

      <div className="flex flex-wrap justify-center items-center gap-5">
        {blogs.map((data, index) => {
          const imageUrl = `${getEnv("VITE_MEDIA_BASE_URL")}/uploads/${
            data.image
          }`;

          return (
            <div
              key={index}
              className=" h-110 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between p-4"
            >
              <div>
                <div className="mb-3 overflow-hidden rounded-xl">
                  <img
                    src={imageUrl}
                    alt={data.title}
                    className="h-40 w-full object-cover rounded-xl transform hover:scale-105 transition"
                  />
                </div>

                <div className="mb-1 flex justify-between text-xs text-gray-500">
                  <p>Category: {data.category.title}</p>
                  <p>{data.date}</p>
                </div>

                <h4 className="text-lg font-semibold mb-1">{data.title}</h4>
                <p className="text-sm text-gray-500 mb-2">By {data.author}</p>

                <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                  {data.content}
                </p>
              </div>

              <div className="mt-auto">
                <Button className="rounded-md text-sm">
                  <Link to={BlogDetailsRoute({ title, id: data._id })}>
                    See More
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBlogs;
