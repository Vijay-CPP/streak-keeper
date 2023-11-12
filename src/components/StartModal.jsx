import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useStreak from "../hooks/useStreak";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartModal = ({ setStartModal }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const { user } = useUserAuth();
  const { streakData, loading, error } = useStreak(user.uid);

  async function handleSubmit(e) {
    e.preventDefault();

    const today = new Date();
    let selectedDate = new Date(date);

    if (selectedDate > today) {
      toast.error("You cannot start in future!");
      return;
    }

    // If time is provided, set the hours and minutes
    if (time !== "") {
      const [hours, minutes] = time.split(":");
      selectedDate.setHours(parseInt(hours, 10));
      selectedDate.setMinutes(parseInt(minutes, 10));
    } else {
      selectedDate.setHours(0);
      selectedDate.setMinutes(0);
    }

    const data = {
      userId: user.uid,
      start: selectedDate,
      name: user.displayName,
      lastStreak: 0,
      isRunning: true,
    };

    try {
      if (streakData === null) {
        await addDoc(collection(db, "streaks"), data);
      } else {
        const streakRef = doc(db, "streaks", streakData.streakId);
        await updateDoc(streakRef, {
          start: selectedDate,
          isRunning: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setStartModal(false);
  }

  return (
    <div className="fixed h-screen w-screen top-0 left-0 backdrop-blur-sm flex items-center justify-center">
      <div className=" bg-purple-300 p-8 rounded-md  w-fit">
        <form onSubmit={handleSubmit} className="text-center">
          <label htmlFor="date" className="block mb-4 text-gray-900 text-lg">
            Select any previous date or start from now!
          </label>
          <div className="flex gap-2">
            <input
              id="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="text-md mb-4 p-2 border rounded-md w-full text-gray-900"
              required
            />

            <input
              id="time"
              type="time"
              onChange={(e) => setTime(e.target.value)}
              className="text-md mb-4 p-2 border rounded-md w-full text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold mr-2"
          >
            Start
          </button>
          <button
            onClick={() => setStartModal(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-bold"
          >
            Close
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StartModal;
