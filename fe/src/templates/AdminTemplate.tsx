import React from "react";
import MenuAdmin from "../component/MenuAdmin";
import Footer from "../component/Footer";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

interface Props {
  component: React.FC;
}

const breadcrumbNameMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/players": "Players",
  "/dashboard/trophies": "Trophies",
};

const AdminTemplate: React.FC<Props> = ({ component: Component }) => {
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: (
        <Link to={url} className="text-decoration-none">
          {breadcrumbNameMap[url]}
        </Link>
      ),
    };
  });

  const breadcrumbItems = [
    {
      title: <span className="pe-none">Home</span>,
      key: "",
    },
  ].concat(extraBreadcrumbItems);

  return (
    <div
      className="admin-template d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-grow-1">
        <MenuAdmin />
        <div className="flex-grow-1 d-flex flex-column">
          <div className="px-5 mb-0 py-3 w-100 bg-white border-bottom">
            <h4 className="text-uppercase d-flex align-items-center">
              {location.pathname.slice(location.pathname.lastIndexOf("/") + 1)}
            </h4>
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div
            className="px-5 py-3 flex-grow-1"
            style={{ background: "#f3f6f9" }}
          >
            <Component />
          </div>
          <Footer className="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
