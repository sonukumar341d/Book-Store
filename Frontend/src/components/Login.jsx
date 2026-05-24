import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Login = forwardRef((props, ref) => {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo,
      );

      console.log(res.data);

      if (res.data) {
        toast.success("Login Successfully");

        localStorage.setItem("User", JSON.stringify(res.data.user));

        setAuthUser(res.data.user);

        document.getElementById("my_modal_3").close();
      }
    } catch (err) {
      if (err.response) {
        console.log(err);

        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <dialog id="my_modal_3" ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              <span className="text-sm text-red-500">Email is required</span>
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
              <span className="text-sm text-red-500">Password is required</span>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
            >
              Login
            </button>

            <p className="text-sm">
              Not registered?
              <Link
                to="/signup"
                className="ml-1 underline text-blue-500 cursor-pointer"
              >
                SignUp
              </Link>
            </p>
          </div>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default Login;
