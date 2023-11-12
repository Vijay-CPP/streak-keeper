import React from "react";
import { TbFlame } from "react-icons/tb";
import { AiOutlineAreaChart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { MdDashboard } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logOut();
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center w-[90vw] mx-auto py-3">
      <Link to={"/"}>
        <div className="flex gap-2 items-center text-center">
          <TbFlame className="text-4xl text-violet-400" />
          <h1 className="text-purple-500 text-[1.5rem] font-medium">
            Streak Keeper
          </h1>
        </div>
      </Link>

      {user ? (
        <ul className="flex gap-8 items-center">
          <li>
            <Link to={"/"}>
              <div className="flex gap-2 items-center">
                <BiHomeSmile className="text-2xl text-purple-400" />
                <h1 className="text-xl">Home</h1>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"}>
              <div className="flex gap-2 items-center">
                <MdDashboard className="text-2xl text-purple-400" />
                <h1 className="text-xl">Dashboard</h1>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/leaderboard"}>
              <div className="flex gap-2 items-center">
                <AiOutlineAreaChart className="text-2xl text-purple-400" />
                <h1 className="text-xl">Leaderboard</h1>
              </div>
            </Link>
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            <div className="flex gap-2 items-center px-3 py-2 rounded-md bg-purple-50 border-[1px] border-purple-400 hover:border-purple-200">
              <BiLogOutCircle className="text-2xl text-purple-400" />
              <h1 className="text-xl">Logout</h1>
            </div>
          </li>
          <li>
            <Link to={"/edit-profile"}>
              <div className="flex gap-2 items-center">
                <FiEdit3 className="text-2xl text-purple-400" />
                <h1 className="text-xl">Edit Profile</h1>
              </div>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-4 items-center">
          <li>
            <Link to={"/login"}>
              <h1 className="text-xl bg-purple-500 text-white font-medium px-6 py-2 rounded-md hover:bg-purple-600">Login</h1>
            </Link>
          </li>
          <li>
            <Link to={"/signup"}>
              <h1 className="text-xl border-[1px] px-6 py-2 bg-purple-200 rounded-md hover:bg-purple-300">Sign Up</h1>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
