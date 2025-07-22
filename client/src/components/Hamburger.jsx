import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { PiSignIn } from "react-icons/pi";
import TopBarSideProfileMenu from "./TopBarSideProfileMenu";
import { useSelector } from "react-redux";
import { RequestBlogRoute, SignInRoute } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import logo from "@/assets/logo-white.png";
import { IoMdClose } from "react-icons/io";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaBlog, FaRegUserCircle } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import {
  AllBlogRoute,
  AllCategoryRoute,
  CategoryDetailsRoute,
} from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";

const Hamburger = ({ show, onClose }) => {
  const user = useSelector((state) => state.user);
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

  const RequestBlogRouteHandler = () => {
    if (!user.isLoggedIn) {
      showToast("error", "Need to Login to access this.");
      navigate(SignInRoute);
      return;
    }
    navigate(RequestBlogRoute);
  };

  return (
    <div className="fixed inset-0 z-30 flex md:hidden pointer-events-none">
      {/* Sidebar */}
      <div
        className={`ml-auto w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out pointer-events-auto ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center px-5 py-3 border-b">
          <IoMdClose size={24} onClick={onClose} />
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          <SearchBox onSearch={(title) => navigate(`/search?title=${title}`)} />

          <Button onClick={RequestBlogRouteHandler}>Request a Blog</Button>

          {!user.isLoggedIn ? (
            <Button asChild>
              <Link to={SignInRoute}>
                <PiSignIn />
                <span className="text-sm">Sign In</span>
              </Link>
            </Button>
          ) : (
            <TopBarSideProfileMenu />
          )}

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <IoHomeOutline /> Home
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={AllBlogRoute}>
                      <FaBlog /> Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={AllCategoryRoute}>
                      <BiCategory /> Categories
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/profile">
                      <FaRegUserCircle /> Profile
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarMenu>
                {categoryList.map((cat) => (
                  <SidebarMenuItem key={cat._id}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={CategoryDetailsRoute({
                          title: cat.title,
                          id: cat._id,
                        })}
                      >
                        <GoDot /> {cat.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
