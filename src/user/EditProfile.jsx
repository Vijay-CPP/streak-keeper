import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import useStreak from "../hooks/useStreak";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const EditProfile = () => {
  const { user, updateProfileData, updateProfileEmail, updateProfilePassword } =
    useUserAuth();

  const { streakData, loading, error } = useStreak(user.uid);

  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateDisplayName = async () => {
    try {
      await updateProfileData({ displayName: newDisplayName });

      if (streakData) {
        const streakRef = doc(db, "streaks", streakData.streakId);
        await updateDoc(streakRef, { name: newDisplayName });
      }
      toast.success("Display name updated successfully!");
    } catch (error) {
      toast.error("Error updating display name: " + error.message);
    }
    setNewDisplayName("");
  };

  const handleUpdateEmail = async () => {
    try {
      await updateProfileEmail(newEmail);
      toast.success(
        "Email updated successfully! Please re-login with the new email."
      );
    } catch (error) {
      toast.error("Error updating email: " + error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updateProfilePassword(newPassword);
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Error updating password: " + error.message);
    }
  };

  useEffect(() => {
    setNewDisplayName("");
    setNewEmail("");
    setNewPassword("");
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex w-[80vw] mx-auto bg-indigo-100 pb-6">
        <div className="mx-auto mt-10 p-4 border rounded-md w-[30vw] bg-white">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

          <div className="mb-4">
            <p className="text-lg font-semibold">Current Data:</p>
            <h1 className="text-lg">
              Email: <p className="text-xl font-medium">{user.email}</p>
            </h1>
            <h1 className="text-lg mt-4">
              Display Name:{" "}
              <p className="text-xl font-medium">
                {user.displayName || "No display name"}
              </p>
            </h1>
          </div>
        </div>

        <div className="mx-auto mt-10 p-4 border rounded-md w-[40vw] bg-white">
          <div className="mb-4">
            <p className="text-lg font-semibold">Update Display Name:</p>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-2"
              placeholder="New Display Name"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              required
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold"
              onClick={handleUpdateDisplayName}
            >
              Update Display Name
            </button>
          </div>

          <div>
            <p className="text-lg font-semibold">Update Password:</p>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-2"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              value={newPassword}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold"
              onClick={handleUpdatePassword}
            >
              Update Password
            </button>
          </div>

          <Link to={"/forgot-password"}>
            <p className=" text-gray-600 mt-2 font-medium"> Forgot Password</p>
          </Link>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
