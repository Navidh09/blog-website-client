import axios from "axios";
import AllBlogs from "../AllBlogs";
import { useEffect } from "react";
import { useState } from "react";

const RecentPosts = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs6`).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-center my-8 lg:pt-30 lg:pb-10 text-4xl text-violet-700 font-semibold">
        Recent Blogs
      </h2>
      <div className="overflow-x-auto border rounded-box bg-base-300 w-11/12 mx-auto mt-10">
        {blogs.length === 0 ? (
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
            <p className="text-center font-bold text-2xl p-5">
              No Data Available
            </p>
          </>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default RecentPosts;
