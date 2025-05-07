import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h2>Page Not Found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
