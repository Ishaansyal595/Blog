import React from "react";
import logo from "@/assets/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import TopBarSideProfileMenu from "./TopBarSideProfileMenu";
import { RequestBlogRoute, SignInRoute } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const RequestBlogRouteHandler = () => {
    if (!user.isLoggedIn) {
      showToast("error", "Need to Login to access this.");
      navigate(SignInRoute);
      return;
    }
    navigate(RequestBlogRoute);
  };

  return (
    <header className="flex justify-between items-center h-16 fixed w-full z-20 px-5 bg-white border-b shadow-black">
      <div>
        <img src={logo} alt="logo" />
      </div>

      <div>
        <SearchBox onSearch={(title) => navigate(`/search?title=${title}`)}  />
      </div>

      <div>
        <Button onClick={RequestBlogRouteHandler}>
          <Link to={RequestBlogRoute}>Request a Blog</Link>
        </Button>
      </div>

      <div>
        <Button asChild>
          {!user.isLoggedIn ? (
            <Link to={SignInRoute}>
              <PiSignIn />
              <span className="text-sm">Sign In</span>
            </Link>
          ) : (
            <TopBarSideProfileMenu />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
