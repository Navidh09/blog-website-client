import React from "react";
import useAuth from "../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { title, image, shortDescription, longDescription, category, _id } =
    useLoaderData();

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const finalData = Object.fromEntries(formData.entries());

    console.log(finalData);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/update/${_id}`, finalData)
          .then((res) => {
            if (res.data.modifiedCount) {
              navigate("/blogs");
              Swal.fire("Saved!", "", "success");
            }
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-violet-700 my-4 text-center">
        Create Blog
      </h2>
      <div className="card bg-base-100 w-full mx-auto shadow-2xl">
        <form onSubmit={handleUpdate} className="card-body w-[90vw] mx-auto">
          {/* blog title */}
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Blog Title</span>
            </label>
            <input
              type="text"
              defaultValue={title}
              name="title"
              placeholder="Blog Title"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* image url */}
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Image</span>
            </label>
            <input
              type="url"
              name="image"
              defaultValue={image}
              placeholder="image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Blog Category */}
          <div className="form-control">
            <div>
              <label className="label mb-1">
                <span className="label-text">Blog Category</span>
              </label>
            </div>
            <select
              name="category"
              defaultValue={category}
              className="select w-full"
              required
            >
              <option disabled={true}>Pick your Blog Category</option>
              <option>Programming</option>
              <option>Travel</option>
              <option>Lifestyle</option>
              <option>Finance</option>
              <option>Health</option>
            </select>
          </div>

          {/* short description */}
          <div className="form-control">
            <div>
              <label className="label mb-1">
                <span className="label-text">Blog Description (short)</span>
              </label>
            </div>
            <textarea
              className="textarea w-full"
              defaultValue={shortDescription}
              name="shortDescription"
              placeholder="Blog description (short)"
              required
            ></textarea>
          </div>
          <div className="form-control">
            <div>
              <label className="label mb-1">
                <span className="label-text">Blog Description (Long)</span>
              </label>
            </div>
            <textarea
              className="textarea w-full"
              defaultValue={longDescription}
              name="longDescription"
              placeholder="Blog description (Long)"
              required
            ></textarea>
          </div>

          {/* author email */}
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Author Email</span>
            </label>
            <input
              defaultValue={user?.email}
              type="email"
              name="email"
              placeholder="Author-email"
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          {/* author name */}
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Author Name</span>
            </label>
            <input
              defaultValue={user?.displayName}
              type="text"
              name="author"
              placeholder="Author-name"
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* add Blog button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary btn-block">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
