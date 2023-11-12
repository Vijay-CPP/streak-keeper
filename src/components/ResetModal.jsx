import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import useStreak from "../hooks/useStreak";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const ResetModal = ({ setResetModal, currentStreak }) => {
  const { user } = useUserAuth();
  const { streakData, loading, error } = useStreak(user.uid);

  async function handleResetClick() {
    const data = {
      start: null,
      lastStreak: currentStreak,
      isRunning: false,
    };

    try {
      const streakRef = doc(db, "streaks", streakData.streakId);
      await updateDoc(streakRef, data);
    } catch (error) {
      console.log(streakData)
      console.log("Update Error : " + error);
    }
    setResetModal(false);
  }

  return (
    <div className="fixed h-screen w-screen top-0 left-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-purple-300 p-8 rounded-md w-fit text-white">
        <div className="text-lg mb-4 text-gray-900 font-medium">
          Are you sure you want to reset your streak?
        </div>
        <div className="flex flex-col gap-2">
          <div
            onClick={handleResetClick}
            className="bg-red-500 w-full text-white px-4 py-2 rounded-md cursor-pointer font-bold mr-2"
          >
            Yes, I want to reset
          </div>
          <div
            onClick={() => setResetModal(false)}
            className="bg-blue-500 text-white px-4 py-2 w-full rounded-md cursor-pointer font-bold"
          >
            No, I will keep going
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
