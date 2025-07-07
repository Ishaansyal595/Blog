import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { AddBlogRoute, BlogDetailsRoute } from "@/helpers/RouteName";
import { Link } from "react-router";
import { getEnv } from "@/helpers/getEnv";
import slugify from "slugify";

const AllBlogList = () => {
  const user = useSelector((state) => state.user.user.role);

  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/public/blogs`
        );
        const data = await response.json();

        setBlogList(data.blog);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBlog();
  }, []);
  return (
    <div className="p-5 flex flex-col flex-wrap justify-center items-center gap-4">
      {user === "admin" && (
        <Button className="-ml-220">
          <Link to={AddBlogRoute}>Add Blog</Link>
        </Button>
      )}

      <div className="flex flex-wrap justify-center items-center gap-5">
        {blogList.map((data, index) => {
          const imageUrl = `${getEnv(
            "VITE_MEDIA_BASE_URL"
          )}/uploads/${data.image}`;

          const title = slugify(data.title, { lower: true });

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

export default AllBlogList;
