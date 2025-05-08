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
          className="btn btn-ghost font-bold italic text-[#8A2BE2] text-3xl "
        >
          SportBlogs
        </Link>
        <label className="toggle text-base-content">
          <input type="checkbox" value="dark" className="theme-controller" />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <div className="space-x-2">
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
                  <img className="rounded-full" src={user.photoURL} alt="" />
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
