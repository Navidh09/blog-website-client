import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Blogs from "../pages/Blogs";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Wishlist from "../pages/Wishlist";
import AddBlog from "../pages/AddBlog";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import BlogDetails from "../pages/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://blog-website-server-eight-mu.vercel.app/blogs6"),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
        loader: () =>
          fetch("https://blog-website-server-eight-mu.vercel.app/blogs"),
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blog-website-server-eight-mu.vercel.app/blog/${params.id}`
          ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blog-website-server-eight-mu.vercel.app/blog/${params.id}`
          ),
      },
      {
        path: "/myWishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://blog-website-server-eight-mu.vercel.app/wishlist"),
      },
      {
        path: "/addBlog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
        // loader: () =>
        //   fetch("https://crowd-funding-server-ruby.vercel.app/donations"),
      },
      {
        path: "/featuredBlogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
        loader: () =>
          fetch(
            "https://blog-website-server-eight-mu.vercel.app/featuredBlogs"
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
