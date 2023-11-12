import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BadgeSection from "../components/BadgeSection";
import StreakSection from "../components/StreakSection";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-[95vw] mx-auto items-center pt-10 h-[60vh] gap-4">
        <BadgeSection />
        <StreakSection />
      </div>
    </div>
  );
};

export default Dashboard;
