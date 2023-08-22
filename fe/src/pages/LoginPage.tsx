import React from "react";
import Login from "../component/Login";
import { tokenLocalStorage } from "../utils";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const token = localStorage.getItem(tokenLocalStorage);

  return (
    <>
      {token ? (
        <Navigate to="/dashboard" />
      ) : (
        <div className="login-page py-5 container">
          <div className="text-center mb-5">
            <img
              src="./assets/images/Logo.png"
              alt="Logo Manchester United"
              width={100}
            />
          </div>
          <Login />
        </div>
      )}
    </>
  );
};

export default LoginPage;
