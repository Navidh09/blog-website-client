import { useLoaderData } from "react-router";
import AllBlogs from "../components/AllBlogs";

const FeaturedBlogs = () => {
  const featuredBlogs = useLoaderData();

  return (
    <div>
      <h1 className="text-center mt-10 text-4xl font-semibold text-[#8A2BE2] underline">
        Featured Blogs
      </h1>
      <div className="overflow-x-auto border rounded-box bg-base-300 w-11/12 mx-auto mt-10">
        {featuredBlogs.length > 0 ? (
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
              {featuredBlogs.map((blog, idx) => (
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
    </div>
  );
};

export default FeaturedBlogs;
