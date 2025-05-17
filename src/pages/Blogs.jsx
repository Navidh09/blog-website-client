import { useEffect } from "react";
import AllBlogs from "../components/AllBlogs";
import axios from "axios";
import { useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs`).then((res) => {
      setBlogs(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-10 text-4xl font-semibold text-[#8A2BE2] underline">
        All Blogs
      </h1>
      {!loading ? (
        <div className="overflow-x-auto border rounded-box bg-base-300 w-11/12 mx-auto mt-10">
          {blogs.length > 0 ? (
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
                {blogs.map((blog, idx) => (
                  <AllBlogs blog={blog} idx={idx} key={blog._id}></AllBlogs>
                ))}
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
      ) : (
        <p className="text-center text-4xl mt-20 text-white">Loading...</p>
      )}
    </div>
  );
};

export default Blogs;
