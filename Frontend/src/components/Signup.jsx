import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo,
      );

      console.log(res.data);

      if (res.data) {
        toast.success("Signup Successfully");

        // Save user
        localStorage.setItem("User", JSON.stringify(res.data.user));

        // Redirect to home page
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.log(err);

        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative bg-white shadow-md rounded-lg p-6 w-96">
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Signup</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mt-4 space-y-2">
            <span>Name</span>

            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full px-3 py-1 border rounded-md outline-none"
              {...register("fullname", { required: true })}
            />

            {errors.fullname && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mt-4 space-y-2">
            <span>Email</span>

            <input
              type="email"
              placeholder="Enter your E-mail"
              className="w-full px-3 py-1 border rounded-md outline-none"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <span>Password</span>

            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-3 py-1 border rounded-md outline-none"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
            >
              Signup
            </button>

            <p className="text-sm">
              Have an account?
              <Link
                to="/"
                className="ml-1 underline text-blue-500 cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
