import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/blogs"}>All Blogs</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/addBlog"}>Add Blog</NavLink>
          </li>
          <li>
            <NavLink to={"/myWishlist"}>Wishlist</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/featuredBlogs"}>Featured Blogs</NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        toast.success("logged out");
        navigate("/login");
      })
      .catch(() => {
        toast.error("something error");
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link
          to={"/"}
          className="btn btn-ghost md:flex font-bold italic text-[#8A2BE2] text-3xl"
        >
          <img
            className="w-10 -ml-4 md:ml-0"
            src="../../../public/blog.png"
            alt=""
          />
          <span className="hidden md:flex">BlogSphere</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <div className="space-x-1 flex">
            <NavLink
              className="btn hover:bg-white hover:text-[#8A2BE2] hover:font-bold"
              to={"/login"}
            >
              Log In
            </NavLink>

            <NavLink
              className="btn hover:bg-white hover:text-[#8A2BE2] hover:font-bold"
              to={"/register"}
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            {user.photoURL ? (
              <div className="w-[40px]">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <img className="rounded-full" src={user?.photoURL} alt="" />
                </div>
              </div>
            ) : (
              <div className="tooltip tooltip-bottom" data-tip="User">
                <FaRegUserCircle className="text-3xl"></FaRegUserCircle>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="btn bg-[#8A2BE2] hover:bg-white hover:text-black text-white"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
