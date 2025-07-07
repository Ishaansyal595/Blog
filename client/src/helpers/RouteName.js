export const IndexRoute = "/";

// User Routes
export const SignInRoute = "/sign-in";
export const SignUpRoute = "/sign-up";
export const ProfileRoute = "/profile";

// Category Routes
export const AllCategoryRoute = "/category";
export const AddCategoryRoute = "/category/add";
export const EditCategoryRoute = (category_id) =>
  category_id ? `/category/edit/${category_id}` : "/edit-category/:category_id";

export const CategoryDetailsRoute = ({ title, id }) =>
  `/category/${title}/${id}`;

// Blog Routes
export const AllBlogRoute = "/blogs";
export const AddBlogRoute = "/blogs/add";
export const BlogDetailsRoute = ({ title, id }) => `/blogs/${title}/${id}`;

export const RequestBlogRoute = "/blog/request";

export const EditBlogRoute = (blog_id) =>
  blog_id ? `/blog/edit/${blog_id}` : "/edit-blog/:blog_id";

export const noBlogFoundRoute = "*";
