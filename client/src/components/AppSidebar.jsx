import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaBlog, FaRegUserCircle } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import {
  AllBlogRoute,
  AllCategoryRoute,
  CategoryDetailsRoute,
} from "@/helpers/RouteName";
import { useEffect, useState } from "react";
import { getEnv } from "@/helpers/getEnv";

const AppSidebar = () => {
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

  return (
    <Sidebar className="h-full"> {/* ensure full height */}
      <SidebarHeader>
        <img src={logo} alt="logo" className="w-28" />
      </SidebarHeader>
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
    </Sidebar>
  );
};

export default AppSidebar;
