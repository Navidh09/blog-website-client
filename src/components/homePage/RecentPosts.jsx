import { Link, useLoaderData } from "react-router";
import AllBlogs from "../AllBlogs";

const RecentPosts = () => {
  const blogs = useLoaderData();
  console.log(blogs);

  return (
    <div>
      <h2 className="text-center pt-10 text-4xl text-violet-700 font-semibold">
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
