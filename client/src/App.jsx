import React from "react";
import Layout from "./layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  IndexRoute,
  ProfileRoute,
  SignInRoute,
  SignUpRoute,
} from "./helpers/RouteName";

import {
  EditCategoryRoute,
  AllCategoryRoute,
  AddCategoryRoute,
} from "./helpers/RouteName";

import {
  AllBlogRoute,
  AddBlogRoute,
  RequestBlogRoute,
} from "./helpers/RouteName";

import IndexPage from "./pages/IndexPage";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

import Categories from "./pages/category/Categories";
import CategoryDetails from "./pages/category/CategoryDetails";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";

import RequestBlog from "./pages/Blog/RequestBlog";
import Blogs from "./pages/Blog/Blogs";
import AddBlog from "./pages/Blog/AddBlog";
import BlogsDetail from "./pages/Blog/BlogsDetail";
import SearchBlogs from "./pages/Blog/SearchBlogs";
// import EditBlog from "./pages/Blog/EditBlog";
// import NoBlogFound from "./pages/Blog/NoBlogFound.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IndexRoute} element={<Layout />}>
          {/* Index Route */}
          <Route index element={<IndexPage />} />

          {/* Profile Route */}
          <Route path={ProfileRoute} element={<ProfilePage />} />

          {/* Category Route */}
          <Route path={AllCategoryRoute} element={<Categories />} />
          <Route path="/category/:categoryTitle/:categoryId" element={<CategoryDetails />} />
          <Route path={AddCategoryRoute} element={<AddCategory />} />
          <Route path={EditCategoryRoute()} element={<EditCategory />} />

          {/* Blog Route */}
          <Route path={AllBlogRoute} element={<Blogs />} />
          <Route path={AddBlogRoute} element={<AddBlog />} />
          <Route path={RequestBlogRoute} element={<RequestBlog />} />
          <Route path="/blogs/:title/:id" element={<BlogsDetail />} />
          <Route path="/search" element={<SearchBlogs />} />
          {/*  <Route path={EditBlogRoute()} element={<EditBlog />} /> */}
          {/* <Route path={noBlogFoundRoute} element={<NoBlogFound />} /> */}
        </Route>

        {/* SignIn/SignUp Route */}
        <Route path={SignInRoute} element={<SignInPage />} />
        <Route path={SignUpRoute} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
