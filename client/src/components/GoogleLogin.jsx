import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { useNavigate } from "react-router";
import { IndexRoute } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLoginHandler = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);

      const userData = googleResponse.user;

      const bodyData = {
        username: userData.displayName,
        email: userData.email,
        avatar: userData.photoURL,
      };

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        showToast("error", resData.message);
        return;
      }

      dispatch(setUser(resData.user));
      showToast("success", resData.message);

      navigate(IndexRoute); // ✅ redirect to home/dashboard after login
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <Button
      onClick={googleLoginHandler}
      className="w-full border border-gray-200 rounded-md flex justify-center items-center p-2 gap-2 mb-4 bg-white text-black hover:text-white"
    >
      <FcGoogle size={20} />{" "}
      <span className="text-md">Continue With Google</span>
    </Button>
  );
};

export default GoogleLogin;
