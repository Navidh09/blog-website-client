import { NavLink, useLoaderData, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BlogDetails = () => {
  const blog = useLoaderData();
  const { user } = useAuth();
  const [remainingBlog, setRemainingBlog] = useState(blog);
  const navigate = useNavigate();
  console.log(remainingBlog);

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
        axios
          .delete(
            `https://blog-website-server-eight-mu.vercel.app/blog/${id}`,
            id
          )
          .then((res) => {
            if (res.data.deletedCount) {
              navigate("/blogs");
              Swal.fire({
                title: "Deleted!",
                text: "Selected blog has been deleted.",
                icon: "success",
              });
              const remaining = blog.filter((blog) => blog._id !== id);
              setRemainingBlog(remaining);
            }
          });
      }
    });
  };

  const {
    title,
    image,
    shortDescription,
    longDescription,
    category,
    createdAt,
    email,
    author,
    _id,
  } = blog;

  return (
    <div className="card bg-base-100 w-screen mx-auto shadow-sm mt-10">
      <figure className="flex-col">
        <img
          className="w-2/4 max-h-120 max-w-96"
          src={image}
          alt="blog-image"
        />
        <p>{shortDescription}</p>
      </figure>
      <div className="card-body w-3/4 mx-auto text-xl mt-8">
        <h2 className="card-title text-4xl">{title}</h2>
        <p className="text-sm mb-4">
          Author: {author}, Posted Date:{" "}
          {format(new Date(createdAt), "dd MMM yyyy")}
        </p>
        <p className="mb-4 text-xl">
          Blog Category: <span className="font-bold">{category}</span>
        </p>
        <p className="text-lg">{longDescription}</p>
        {email === user.email ? (
          <>
            {" "}
            <h2 className="text-red-500 mt-8">
              Users are not allowed to comment on his/her own Post
            </h2>
            <div>
              <NavLink
                to={`/update/${_id}`}
                className="btn btn-block mt-3 text-xl h-12 hover:bg-[#8A2BE2] hover:text-white text-[#8A2BE2]"
              >
                Update Blog
              </NavLink>
              <button
                className="btn btn-block mt-3 text-xl h-12 hover:bg-[#8A2BE2] hover:text-white text-[#8A2BE2]"
                onClick={() => handleDelete(_id)}
              >
                Delete Blog
              </button>
            </div>
          </>
        ) : (
          <textarea
            className="textarea w-full mt-3"
            name="shortDescription"
            placeholder="write your comments here"
            required
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
