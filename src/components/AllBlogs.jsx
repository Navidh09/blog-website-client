import { Link, useNavigate } from "react-router";
import { format } from "date-fns";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const AllBlogs = ({ blog, idx }) => {
  const { title, category, createdAt, _id, author } = blog;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWishlist = () => {
    const wishlist = {
      title,
      category,
      createdAt,
      blogID: _id,
      author,
      email: user?.email,
    };
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "It will added to your wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              "https://blog-website-server-eight-mu.vercel.app/wishlist",
              wishlist
            )
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Success!",
                  text: "Successfully added to your wishlist",
                  icon: "success",
                });
              }
              navigate("/myWishlist");
            })
            .catch((err) => toast.error(err.response.data));
        }
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <tr className="border-2 border-black">
        <th>{idx + 1}</th>
        <td>{title}</td>
        <td>{category}</td>
        <td>{format(new Date(createdAt), "dd MMM yyyy")}</td>
        <td className="md:flex-row flex-col flex md:space-x-3 md:space-y-0 space-y-3">
          <Link to={`/blog/${_id}`} className="btn-primary btn">
            Details
          </Link>
          <Link onClick={handleWishlist} className="btn-primary btn">
            Add to Wishlist
          </Link>
        </td>
      </tr>
    </>
  );
};

export default AllBlogs;
