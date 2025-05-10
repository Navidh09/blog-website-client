import Swal from "sweetalert2";

const NewsLetter = () => {
  const handleSubscription = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you for subscribing to our newsletter",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="my-16">
      <h2 className="lg:text-5xl text-2xl font-extrabold text-gray-100 text-center">
        Never Miss a Blog Post Again
      </h2>
      <p className="lg:text-xl text-md font-medium text-violet-400 my-4 text-center max-w-3xl mx-auto">
        Join thousands of readers who receive curated articles, tutorials, and
        insights every week.
      </p>
      <div className="card bg-base-100 w-full mx-auto shadow-2xl">
        <form
          onSubmit={handleSubscription}
          className="card-body w-[90vw] mx-auto mb-10"
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 w-3/4 mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter your email here"
              className="input input-bordered md:input-xl w-full px-4 py-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <button
              type="submit"
              className="btn btn-primary md:btn-xl md:w-40 w-28 px-6 py-3 rounded-md"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
