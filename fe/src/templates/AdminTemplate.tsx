import React, { useEffect, useState } from "react";
import MenuAdmin from "../component/admin/MenuAdmin";
import Footer from "../component/commons/Footer";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Drawer } from "antd";
import "./index.scss";

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
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isScreenPC, setIsScreenPC] = useState<boolean>(true);

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

  const handleWindowResize = () => {
    const width = window.innerWidth;
    if (width < 992) {
      setIsScreenPC(false);
    } else {
      setIsScreenPC(true);
    }
  };

  const breadcrumbItems = [
    {
      title: <span className="pe-none">Home</span>,
      key: "",
    },
  ].concat(extraBreadcrumbItems);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="admin-template d-lg-flex">
      <div className="admin-template__menu border-end">
        {isScreenPC ? (
          <MenuAdmin />
        ) : (
          <Drawer
            placement="right"
            closable={false}
            onClose={() => setIsShowMenu(false)}
            open={isShowMenu}
            width={250}
            bodyStyle={{ padding: 0 }}
          >
            <MenuAdmin onCloseMenu={() => setIsShowMenu(false)} />
          </Drawer>
        )}
      </div>
      <div className="admin-template__content flex-grow-1 d-flex flex-column">
        <div className="admin-template__header">
          <div className="px-5 mb-0 py-3 w-100 bg-white border-bottom d-flex align-items-center">
            <img
              src="/assets/images/Logo.png"
              alt=""
              height={50}
              className="me-4 d-block d-lg-none"
            />
            <div>
              <h4 className="text-uppercase d-flex align-items-center">
                {location.pathname.slice(
                  location.pathname.lastIndexOf("/") + 1
                )}
              </h4>
              <div className="d-none d-sm-block">
                <Breadcrumb items={breadcrumbItems} />
              </div>
            </div>
            <img
              src="/assets/icons/menu.png"
              alt=""
              height={25}
              className="ms-auto d-block d-lg-none pe-pointer"
              onClick={() => setIsShowMenu(true)}
            />
          </div>
        </div>
        <div className="p-5 flex-grow-1" style={{ background: "#f3f6f9" }}>
          <Component />
        </div>
        <div className="admin-template__footer">
          <Footer className="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
