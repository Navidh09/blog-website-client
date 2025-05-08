import { Link } from "react-router";
import { format } from "date-fns";

const AllBlogs = ({ blog, idx }) => {
  const { title, category, createdAt, _id } = blog;

  return (
    <>
      <tr className="border-2 border-black">
        <th>{idx + 1}</th>
        <td>{title}</td>
        <td>{category}</td>
        <td>{format(new Date(createdAt), "dd MMM yyyy")}</td>
        <td className="flex gap-3">
          <Link to={`/blog/${_id}`} className="btn-primary btn">
            Details
          </Link>
          <Link to={`/blog/${_id}`} className="btn-primary btn">
            Add to Wishlist
          </Link>
        </td>
      </tr>
    </>
  );
};

export default AllBlogs;
