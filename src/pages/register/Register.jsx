import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import registerLottieData from "../../assets/lottie/register.json";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import Lottie from "lottie-react";

const Register = () => {
  const {
    registerUser,
    setUser,
    googleLogin,
    setErrorMessage,
    errorMessage,
    userProfile,
    setLoader,
  } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    setErrorMessage(null);
    googleLogin(googleProvider)
      .then((res) => {
        setUser(res.user);
        toast.success("Registration Successful");
        navigate("/");
      })
      .catch(() => {
        toast.error("Something Wrong");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage("Password must contain at least one special character.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setErrorMessage("Password must contain at least one numeric character.");
      return;
    }

    const details = {
      displayName: name,
      photoURL: photo,
    };

    setErrorMessage(null);

    registerUser(email, password)
      .then((res) => {
        setUser(res.user);
        userProfile(details).then(() => {
          setLoader(false);
          toast.success("Registration Successful");
          navigate("/");
        });
        e.target.reset();
      })
      .catch(() => {
        toast.error("Something Wrong");
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen py-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={registerLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold ml-3 mt-3">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset relative">
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">PhotoURL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="photo-URL"
              />
              <label className="fieldset-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 btn btn-sm top-60"
              >
                {!showPassword ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <p className="text-red-600 text-center -mt-5">{errorMessage}</p>
          <div className="text-center mb-4">
            <button
              onClick={handleGoogleLogin}
              className="cursor-pointer btn-md px-6 btn shadow-lg"
            >
              Sign Up With Google{" "}
              <span className="ml-1 text-xl">
                <FcGoogle />
              </span>
            </button>
          </div>
          <p className="pl-3 pb-6">
            Already have an account ? Please{" "}
            <span className="text-blue-600">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
