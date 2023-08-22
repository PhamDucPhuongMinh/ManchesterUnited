import React, { useEffect } from "react";
import "./App.scss";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routes from "./routes";
import Message from "./component/Message";
import { checkAdminAPI } from "./services";
import { tokenLocalStorage } from "./utils";

const App: React.FC = () => {
  const handleCheckAdmin = async (token: string) => {
    const resultCheckAdminApi = await checkAdminAPI(token);
    if (resultCheckAdminApi.result === false) {
      localStorage.removeItem(tokenLocalStorage);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(tokenLocalStorage);
    if (token) {
      handleCheckAdmin(token);
    }
  }, []);

  return (
    <>
      <Routes />
      <Message />
    </>
  );
};

export default App;
