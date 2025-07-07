import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IndexRoute, SignInRoute } from "@/helpers/RouteName";
import { Button } from "@/components/ui/button";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "./GoogleLogin";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const FormComponent = ({
  className,
  heading,
  text,
  route,
  label,
  isSignUp,
  routeEndPoint,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formsInput = [
    ...(isSignUp
      ? [{ id: 0, name: "Username", key: "username", type: "text" }]
      : []),
    { id: 1, name: "Email", key: "email", type: "email" },
    { id: 2, name: "Password", key: "password", type: "password" },
    ...(isSignUp
      ? [
          {
            id: 3,
            name: "Confirm Password",
            key: "confirmPassword",
            type: "password",
          },
        ]
      : []),
  ];

  const formSchema = isSignUp
    ? z
        .object({
          username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters long" }),
          email: z.string().email({ message: "Invalid Email Address" }),
          password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Password & Confirm Password should match!",
          path: ["confirmPassword"],
        })
    : z.object({
        email: z.string().email({ message: "Invalid Email Address" }),
        password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters long" }),
      });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignUp && { username: "", confirmPassword: "" }),
    },
  });

  const submitFormHandler = async (data) => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/${routeEndPoint}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        showToast("error", resData.message);
        reset();
        return;
      }

      dispatch(setUser(resData.user));

      showToast("success", resData.message);
      reset();

      if (isSignUp) {
        navigate(SignInRoute); // ✅ redirect to login after signup
      } else {
        navigate(IndexRoute); // ✅ redirect to home/dashboard after login
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit(submitFormHandler)}>
      <h1 className="text-center text-3xl font-bold mb-5">{heading}</h1>

      {/* Google Login */}
      <GoogleLogin />

      {/* Divivder */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <div className="w-full border border-gray-200" />
        <span>OR</span>
        <div className="w-full border border-gray-200" />
      </div>

      {/* Input Fields */}
      {formsInput.map((form) => (
        <div key={form.id} className="flex flex-col gap-2 mb-4">
          <label htmlFor={form.key} className="font-semibold">
            {form.name}
          </label>
          <input
            id={form.key}
            name={form.key}
            type={form.type}
            {...register(form.key)}
            placeholder={`Enter Your ${form.name}`}
            className="border border-gray-200 w-full p-2 rounded-md"
          />
        </div>
      ))}

      {/* Button for Sign In */}
      <Button className="w-full mb-4" type="submit">
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>

      {/* Link for Sign Up */}
      <div className="flex justify-center items-center gap-1.5">
        {text}
        <span>
          <Link to={route} className="text-blue-700 hover:text-blue-900">
            {label}
          </Link>
        </span>
      </div>
    </form>
  );
};

export default FormComponent;
