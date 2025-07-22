import React, { useState } from "react";
import logo from "@/assets/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import TopBarSideProfileMenu from "./TopBarSideProfileMenu";
import { RequestBlogRoute, SignInRoute } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";

const Topbar = () => {
  const [show, setShow] = useState(false);
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
    <header className="flex justify-between items-center h-16 fixed w-full z-20 px-5 bg-white border-b shadow">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={logo} alt="logo" className="h-10 w-auto" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <SearchBox onSearch={(title) => navigate(`/search?title=${title}`)} />
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Button onClick={RequestBlogRouteHandler}>Request a Blog</Button>
        {!user.isLoggedIn ? (
          <Button asChild>
            <Link to={SignInRoute} className="flex items-center gap-1">
              <PiSignIn />
              <span className="text-sm">Sign In</span>
            </Link>
          </Button>
        ) : (
          <TopBarSideProfileMenu />
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setShow(true)}>
          <RxHamburgerMenu size={24} />
        </button>
      </div>

      {/* Render Hamburger outside the button */}
      {show && <Hamburger show={show} onClose={() => setShow(false)} />}
    </header>
  );
};

export default Topbar;
