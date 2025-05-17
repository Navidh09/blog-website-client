import { NavLink, useLoaderData, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const BlogDetails = () => {
  const blog = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/comments`).then((res) => {
      setComments(res.data);
    });
  }, [comments]);

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    const commentData = {
      comment: comment,
      blogId: blog._id,
      email: user.email,
      date: new Date().toISOString(),
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/comments`, commentData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Success");
          e.target.reset();
        }
      });
  };

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
          .delete(`${import.meta.env.VITE_API_URL}/blog/${id}`, id)
          .then((res) => {
            if (res.data.deletedCount) {
              navigate("/blogs");
              Swal.fire({
                title: "Deleted!",
                text: "Selected blog has been deleted.",
                icon: "success",
              });
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
          {format(new Date(createdAt), "yyyy-MM-dd")}
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
          <form onSubmit={handleComment}>
            <textarea
              className="textarea w-full mt-3"
              name="comment"
              placeholder="write your comments here"
              required
            ></textarea>
            <button className="btn mt-2 bg-violet-500 text-xl">Comment</button>
          </form>
        )}

        <div className="mt-5">
          <h2>Comments: </h2>
          {comments.map((comment) => (
            <h3 key={comment._id} className="mt-5">
              {_id === comment.blogId && (
                <h3 className="text-blue-500">
                  {comment.email}:{" "}
                  <span className="text-sm ml-4 text-white">
                    {comment.comment}
                  </span>
                </h3>
              )}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
