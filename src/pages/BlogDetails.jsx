import { NavLink, useLoaderData } from "react-router";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";

const BlogDetails = () => {
  const blog = useLoaderData();
  const { user } = useAuth();

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
            <NavLink
              to={`/update/${_id}`}
              className="btn btn-block mt-3 text-xl h-12 hover:bg-[#8A2BE2] hover:text-white text-[#8A2BE2]"
            >
              Update Blog
            </NavLink>
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
