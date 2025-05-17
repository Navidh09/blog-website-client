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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/blogs6`),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blog/${params.id}`),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blog/${params.id}`),
      },
      {
        path: "/myWishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/wishlist`),
      },
      {
        path: "/addBlog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/featuredBlogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/featuredBlogs`),
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
