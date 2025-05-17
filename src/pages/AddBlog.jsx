import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const AddBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    const finalData = {
      ...initialData,
      createdAt: new Date().toISOString(),
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/blogs`, finalData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Blog added Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/blogs");
        }
      });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-violet-700 my-4 text-center">
        Create Blog
      </h2>
      <div className="card bg-base-100 w-full mx-auto shadow-2xl">
        <form onSubmit={handleAddJob} className="card-body w-[90vw] mx-auto">
          {/* blog title */}
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text">Blog Title</span>
            </label>
            <input
              type="text"
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
              defaultValue="Pick your Blog Category"
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
            <button className="btn btn-primary btn-block">Add Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
