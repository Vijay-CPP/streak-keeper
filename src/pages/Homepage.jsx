import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logOut();
    navigate("/login");
  }
  
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-violet-800 text-white flex items-center justify-center">
        <div className="text-center p-4 md:p-8 lg:p-16">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Welcome to Streak Keeper
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8">
            Keep track of your daily habits and maintain your streaks with
            Streak Keeper.
          </p>

          {!user ? (
            <div className="flex flex-col justify-center md:flex-row items-center md:space-x-4">
              <Link to={"/login"}>
                <h1 className="text-base md:text-xl bg-purple-400 text-white font-medium px-4 md:px-6 py-2 rounded-md hover:bg-purple-500">
                  Login
                </h1>
              </Link>

              <Link to={"/signup"}>
                <h1 className="text-base md:text-xl border-[1px] px-4 md:px-6 py-2 bg-purple-200 rounded-md hover:bg-purple-300 text-gray-800 mt-2 md:mt-0">
                  Sign Up
                </h1>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col justify-center md:flex-row items-center md:space-x-4">
              <Link to={"/dashboard"}>
                <h1 className="text-base md:text-xl bg-purple-400 text-white font-medium px-4 md:px-6 py-2 rounded-md hover:bg-purple-500">
                  Go to Dashboard
                </h1>
              </Link>

              <h1
                onClick={handleLogout}
                className="text-base md:text-xl border-[1px] px-4 md:px-6 py-2 bg-purple-200 rounded-md hover:bg-purple-300 text-gray-800 mt-2 md:mt-0"
              >
                Logout
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
