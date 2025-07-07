import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { setUser } from "@/redux/user/user.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import userIcon from "@/assets/user.png";
import { Textarea } from "@/components/ui/textarea";
import { userFetch } from "@/hooks/userFetch";
import LoadingSpinner from "./../components/ui/LoadingSpinner";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userId = user?.user?._id;

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const {
    data: userData,
    loading,
    error,
  } = userFetch(
    userId ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${userId}` : null,
    userId ? { method: "get", credentials: "include" } : {},
    [userId]
  );

  const formsInput = [
    { id: 0, name: "Username", key: "username", type: "text" },
    { id: 1, name: "Email", key: "email", type: "email" },
    { id: 2, name: "Bio", key: "bio", type: "text" },
    { id: 3, name: "Password", key: "password", type: "password" },
  ];

  const formSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username should be at least of 3 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }),
    bio: z.string(),
    password: z.string().optional(),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      reset({
        username: userData.user.username || "",
        email: userData.user.email || "",
        bio: userData.user.bio || "",
      });
    }
  }, [userData, reset]);

  const submitFormHandler = async (data) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("data", JSON.stringify(data));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userId}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        showToast("error", resData.message);
        return;
      }

      dispatch(setUser(resData.user));


      return showToast("success", resData.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const handleFileSelection = (files) => {
    const selectedFile = files[0];
    const preview = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setFilePreview(preview);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4 w-full px-70 pb-10 ">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Dropzone onDrop={handleFileSelection}>
            {({ getRootProps, getInputProps }) => (
              <div className="h-40 w-40 rounded-full" {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="h-40 w-40 relative group">
                  <AvatarImage
                    className="h-full w-full rounded-full"
                    src={filePreview || user?.user?.avatar || userIcon}
                  />

                  <AvatarFallback className=" rounded-full h-full w-full bg-gray-200 flex items-center justify-center text-xl">
                    IS
                  </AvatarFallback>

                  <div className="absolute z-20 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out h-full w-full rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                    <IoCameraOutline className="text-primary" size={25} />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>

          <form className="w-full" onSubmit={handleSubmit(submitFormHandler)}>
            {formsInput.map((form) => (
              <div key={form.id} className="flex flex-col gap-2 mb-6">
                <label htmlFor={form.key} className="font-semibold">
                  {form.name}
                </label>
                {form.key === "bio" ? (
                  <Textarea
                    id={form.key}
                    {...register(form.key)}
                    placeholder={`Enter Your ${form.name}`}
                    className="border border-gray-200 w-full p-2 rounded-md"
                  />
                ) : (
                  <input
                    id={form.key}
                    type={form.type}
                    {...register(form.key)}
                    placeholder={`Enter Your ${form.name}`}
                    className="border border-gray-200 w-full p-2 rounded-md"
                  />
                )}
              </div>
            ))}

            <Button type="submit" className="bg-primary rounded-md">
              Save Changes
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
