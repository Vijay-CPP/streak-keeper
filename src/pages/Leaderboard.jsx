import React from "react";
import useLeaderboard from "../hooks/useLeaderboard";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "../components/Navbar";
import { getDateDifference } from "../utility/dateDifference";
import { generateStreakName } from "../utility/badges";
import Loader from "../components/Loader";

const Leaderboard = () => {
  const { user } = useUserAuth();
  const { leaderboard, loading, error } = useLeaderboard(user.uid);

  return (
    <div>
      <Navbar />

      {loading ? (
        <Loader/>
      ) : (
        <div className="w-[90vw] mx-auto">
          <div className="flex font-bold bg-gray-200 p-2">
            <div className="flex-1">Name</div>
            <div className="flex-1">Days</div>
            <div className="flex-1">Badge</div>
          </div>
          {leaderboard.map((obj, idx) => {
            return (
              <div key={idx} className="flex gap-3 p-2 border-b">
                <div className="flex-1">{obj.name ? obj.name : "New Profile"}</div>
                <div className="flex-1">{`${getDateDifference(obj.start).days} Days`}</div>
                <div className="flex-1">{`${generateStreakName(getDateDifference(obj.start).days)}`}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
