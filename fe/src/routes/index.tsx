import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PlayerPage from "../pages/PlayerPage";
import TrophiesPage from "../pages/TrophiesPage";
import HomeTemplate from "../templates/HomeTemplate";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import AdminTemplate from "../templates/AdminTemplate";
import DashboardPage from "../pages/DashboardPage";

const MyRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate component={HomePage} />} />
        <Route
          path="/trophies"
          element={<HomeTemplate component={TrophiesPage} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/players"
          element={<HomeTemplate component={PlayerPage} />}
        />
        <Route
          path="/dashboard/:route?"
          element={
            <PrivateRoute
              component={<AdminTemplate component={DashboardPage} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
