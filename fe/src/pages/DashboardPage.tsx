import React from "react";
import { useParams } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { route } = useParams();
  return (
    <div className="dashboard-page">
      {route === "players" ? "Players" : "Dashboard"}
    </div>
  );
};

export default DashboardPage;
