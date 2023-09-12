import React, { useEffect } from "react";
import "./App.scss";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routes from "./routes";
import Message from "./component/commons/Message";
import { checkAdminAPI } from "./services";
import { tokenLocalStorage } from "./utils";
import { FloatButton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./redux/slices/loadingSlice";
import Spin from "./component/commons/Spin";
import { getLoadingSelector } from "./redux/selectors";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingSelector);

  const handleCheckAdmin = async (token: string) => {
    try {
      dispatch(setLoading(true));
      const resultCheckAdminApi = await checkAdminAPI(token);
      if (!resultCheckAdminApi.data.result) {
        localStorage.removeItem(tokenLocalStorage);
        window.location.replace("/login");
      }
    } catch (error) {
      localStorage.removeItem(tokenLocalStorage);
      window.location.replace("/login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(tokenLocalStorage);
    if (token) {
      handleCheckAdmin(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes />
      <Message />
      <FloatButton.BackTop type="primary" className="btn-go-to-top" />
      <Spin spinning={isLoading} />
    </>
  );
};

export default App;
