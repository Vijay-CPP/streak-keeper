// StreakSection.jsx
import React, { useState, useEffect } from "react";
import StartModal from "./StartModal";
import { useUserAuth } from "../context/UserAuthContext";
import useStreak from "../hooks/useStreak";
import ResetModal from "./ResetModal";
import { getDateDifference } from "../utility/dateDifference";
import { formatTime } from "../utility/formatTime";
import Loader from "./Loader";

const StreakSection = () => {
  const [startModal, setStartModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const { user } = useUserAuth();

  const { streakData, loading, error } = useStreak(user.uid);
  const dateDifference =
    streakData && streakData.isRunning
      ? getDateDifference(streakData.start)
      : null;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dateDifference !== null) {
      setTimer(dateDifference.remainingSeconds);
    }
  }, [dateDifference]);
  function handleStart() {
    setStartModal(true);
  }

  function handleReset() {
    setResetModal(true);
  }

  return (
    <div className="bg-purple-100 text-gray-700 w-full h-full p-8 rounded-lg border-[1px] border-gray-300">
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="text-3xl font-bold mb-4">Streak Info</div>
          <>
            {dateDifference && (
              <>
                <div className="text-lg">
                  Current streak
                  <h1 className="text-4xl font-bold">
                    {dateDifference.days} <span className="text-xl">Days</span>
                  </h1>
                </div>
                {timer > 0 && (
                  <div className="my-2 font-medium text-xl">{`${formatTime(
                    timer
                  )}`}</div>
                )}
              </>
            )}
            <div className="text-lg">
              Last Streak : <span className="text-2xl font-medium">{streakData ? streakData.lastStreak : 0} </span>
             <span className="text-md font-medium"> Days</span>
            </div>
          </>
          {streakData === null || (streakData && !streakData.isRunning) ? (
            <div className="mt-8">
              <button
                onClick={handleStart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold"
              >
                Start
              </button>
              {startModal && <StartModal setStartModal={setStartModal} />}
            </div>
          ) : (
            <div className="mt-8">
              <button
                onClick={handleReset}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-bold"
              >
                Reset
              </button>
              {resetModal && (
                <ResetModal
                  setResetModal={setResetModal}
                  currentStreak={dateDifference.days}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StreakSection;
