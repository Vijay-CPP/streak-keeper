import React, { useEffect, useState } from "react";
import useStreak from "../hooks/useStreak";
import { useUserAuth } from "../context/UserAuthContext";
import { generateStreakName } from "../utility/badges";
import { getDateDifference } from "../utility/dateDifference";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"

const BadgeSection = () => {
  const { user } = useUserAuth();
  const { streakData, loading, error } = useStreak(user.uid);
  const [badgeName, setBadgeName] = useState("");

  useEffect(() => {
    if (streakData && streakData.isRunning) {
      const diff = getDateDifference(streakData.start);
      setBadgeName(generateStreakName(diff.days));
    }
  }, [streakData]);

  return (
    <div className="bg-purple-600 h-full w-full text-white p-8 rounded-lg">
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="text-3xl font-bold mb-4">Badge Info</div>
          {streakData === null || (streakData && !streakData.isRunning) ? (
            <div className="text-xl text-gray-300">
              You do not have any active streak!
            </div>
          ) : (
            <div className="text-lg text-gray-300">
              Current Badge:{" "}
              <h1 className="text-3xl font-bold text-white">{badgeName}</h1>
            </div>
          )}
        </>
      )}

      <Link
        to={"/all-badges"}
        className="text-gray-50 font-bold hover:text-white mt-4 block"
      >
        View All Badges
      </Link>
    </div>
  );
};

export default BadgeSection;
