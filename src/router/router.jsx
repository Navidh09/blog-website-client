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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Page Not Found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
        loader: () => fetch("http://localhost:5000/blogs"),
      },
      {
        path: "/myWishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
        // loader: () =>
        //   fetch("https://crowd-funding-server-ruby.vercel.app/myCampaign"),
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
