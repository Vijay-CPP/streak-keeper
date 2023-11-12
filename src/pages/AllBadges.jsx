import React from "react";
import { badgeData } from "../utility/badges";
import Navbar from "../components/Navbar";

const AllBadges = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap w-[90vw] mx-auto py-6">
        {badgeData.map((obj, idx) => {
          return (
            <div key={idx} className="flex w-full sm:w-[35vw] mx-auto gap-3">
              <div className="w-full sm:w-[20vw] text-xl bg-gray-200 p-1 pl-3 rounded-lg">
                {obj.name}
              </div>
              <div className="text-xl bg-slate-200 p-1 px-2 rounded-lg">
                {obj.start} - {obj.end} Days
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBadges;
