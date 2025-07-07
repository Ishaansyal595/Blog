import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddCategoryRoute, CategoryDetailsRoute } from "@/helpers/RouteName";
import { Button } from "@/components/ui/button";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const AllCategoryLists = () => {
  const user = useSelector((state) => state.user.user.role);

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      {loading && <LoadingSpinner />}
      {user === "admin" && (
        <Button className="-ml-175">
          <Link to={AddCategoryRoute}>Add Category</Link>
        </Button>
      )}
      <div className="flex justify-center items-center flex-wrap gap-5 mb-10 mt-10 ">
        {categoryList.map((category) => {
          const imageUrl = `${getEnv(
            "VITE_MEDIA_BASE_URL"
          )}/${category.image.replace(/\\/g, "/")}`;

          return (
            <Link
              key={category._id}
              to={`/category/${category.slug}/${category._id}`}
            >
              <div className="h-65 w-65 rounded-md border border-gray-300 hover:shadow-2xl">
                <img
                  className="w-80 h-40 rounded-t-md"
                  src={imageUrl}
                  alt={category.title}
                />
                <div className="p-2 text-center">
                  <h3 className="font-semibold text-center">
                    {category.title}
                  </h3>
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategoryLists;
