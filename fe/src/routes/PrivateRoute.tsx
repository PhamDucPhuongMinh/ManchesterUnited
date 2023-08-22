import React from "react";
import { tokenLocalStorage } from "../utils";
import { Navigate } from "react-router-dom";

interface Props {
  component: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ component }) => {
  const token = localStorage.getItem(tokenLocalStorage);
  return <>{token ? component : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
