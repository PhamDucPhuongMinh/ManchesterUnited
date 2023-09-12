import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

interface Props {
  onCloseMenu?: () => void;
}

const MenuAdmin: React.FC<Props> = ({ onCloseMenu }) => {
  return (
    <div className="menu-admin py-4 bg-white">
      <div className="text-center mb-4">
        <img src="/assets/images/Logo.png" alt="" width={70} />
      </div>
      <ul className="menu-admin__list">
        <li className="menu-admin__item" onClick={onCloseMenu}>
          <Link
            to="/dashboard"
            className="text-dark text-decoration-none d-flex align-items-center py-3 px-4 mx-4"
          >
            <img
              src="/assets/icons/dashboard.png"
              alt=""
              width={18}
              className="me-2"
            />
            Dashboard
          </Link>
        </li>
        <li className="menu-admin__item" onClick={onCloseMenu}>
          <Link
            to="/dashboard/players"
            className="text-dark text-decoration-none d-flex align-items-center py-3 px-4 mx-4"
          >
            <img
              src="/assets/icons/soccer-player.png"
              alt=""
              width={18}
              className="me-2"
            />
            Players
          </Link>
        </li>
        <li className="menu-admin__item" onClick={onCloseMenu}>
          <Link
            to="/dashboard/trophies"
            className="text-dark text-decoration-none d-flex align-items-center py-3 px-4 mx-4"
          >
            <img
              src="/assets/icons/trophy.png"
              alt=""
              width={18}
              className="me-2"
            />
            Trophies
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuAdmin;
