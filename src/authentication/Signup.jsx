import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { TbFlame } from "react-icons/tb";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { googleSignIn } = useUserAuth();
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (error) {
      showError(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      showError(error.message);
    }
  };

  const showError = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center justify-center gap-y-3">
      <div className="mx-auto flex gap-2 my-2 items-center text-center">
        <TbFlame className="text-6xl text-indigo-400" />
        <h1 className="text-purple-500 text-[2.5rem] font-bold">
          Streak Keeper
        </h1>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:border-indigo-200"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:border-indigo-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-400 text-white rounded px-4 py-2 hover:bg-indigo-500 focus:outline-none"
          >
            Sign Up
          </button>

          <div className="text-center pt-4">
            <h1>
              Already have an account ?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-500 font-medium"
              >
                Login
              </Link>
            </h1>
          </div>

          <Link to={"/"}>
              <p className="text-center text-gray-600 m-1 font-medium">Home</p>
            </Link>
        </form>

        <div
          className="rounded bg-gray-100 shadow-md p-3 text-center mx-auto w-full hover:shadow-md hover:shadow-indigo-300 transition-all gap-x-3 mt-4 cursor-pointer flex justify-center items-center"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-3xl my-auto" />{" "}
          <p className="text-md text-gray-700">Sign In with Google</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
