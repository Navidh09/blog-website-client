import { Link, useLoaderData } from "react-router";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const Wishlist = () => {
  const { user } = useAuth();
  const totalWishlist = useLoaderData();
  const [wishlist, setWishlist] = useState(totalWishlist);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/wishlist/${id}`, id).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your campaign has been deleted.",
              icon: "success",
            });
            const remainingWish = wishlist.filter((cam) => cam._id !== id);
            setWishlist(remainingWish);
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center mt-10 text-4xl font-semibold text-[#8A2BE2] underline">
        My Wishlist
      </h1>
      <div className="overflow-x-auto border rounded-box bg-base-300 w-11/12 mx-auto mt-10">
        {wishlist.length > 0 ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr className="border-2 border-black">
                <th>#</th>
                <th>Blog Title</th>
                <th>Blog Category</th>
                <th>Posted Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map(
                (wish, idx) =>
                  wish.email === user.email && (
                    <tr className="border-2 border-black">
                      <th>{idx + 1}</th>
                      <td>{wish.title}</td>
                      <td>{wish.category}</td>
                      <td>{format(new Date(wish.createdAt), "dd MMM yyyy")}</td>
                      <td className="flex gap-3">
                        <Link
                          to={`/blog/${wish.blogID}`}
                          className="btn-primary btn"
                        >
                          Details
                        </Link>
                        <Link
                          onClick={() => handleDelete(wish._id)}
                          className="btn-primary btn bg-red-600"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        ) : (
          <>
            <table className="table">
              {/* head */}
              <thead>
                <tr className="border-2 border-black">
                  <th>#</th>
                  <th>Blog Title</th>
                  <th>Blog Category</th>
                  <th>Posted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
            <p className="text-center py-7 text-2xl font-bold">
              No Data to show
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
