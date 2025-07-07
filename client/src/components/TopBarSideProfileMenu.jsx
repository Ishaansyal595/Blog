import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import userIcon from "@/assets/user.png";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { removeUser } from "@/redux/user/user.slice";
import { IndexRoute } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";

const TopBarSideProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        showToast("error", resData.message);
        return;
      }

      dispatch(removeUser());
      showToast("success", resData.message);
      navigate(IndexRoute);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="flex justify-center items-center cursor-pointer h-8 w-8 rounded-full">
          <AvatarImage
            className="h-8 w-8 rounded-full"
            src={user?.user?.avatar || userIcon}
          />
          <AvatarFallback>
            {user?.user?.username?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" mt-3 bg-sidebar shadow w-55 rounded-md p-4 flex flex-col gap-2 z-[9999]">
        <DropdownMenuLabel>
          <p>{user?.user?.username || "Guest"}</p>
          <p className="text-xs text-gray-500">
            {user?.user?.email || "No Email"}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-50 w-full border-1" />

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm cursor-pointer"
        >
          <Link to="/profile">
            <FaRegUser /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm cursor-pointer"
        >
          <Link to="/create-blog">
            <FaPlus /> Create Blog
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-50 w-full border-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm cursor-pointer"
        >
          <IoLogOutOutline color="red" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopBarSideProfileMenu;
