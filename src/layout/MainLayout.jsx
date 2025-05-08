import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const MainLayout = () => {
  const { loader } = useAuth();

  if (loader) {
    return (
      <h2 className="flex items-center justify-center mt-60">
        <span className="loading loading-bars loading-xl"></span>
      </h2>
    );
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-25">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
