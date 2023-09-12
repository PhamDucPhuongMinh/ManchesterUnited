import React, { useRef } from "react";
import "./index.scss";
import Menu from "../../user/Menu";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const toggleMenuBtnRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleToggleMenu = () => {
    if (toggleMenuBtnRef && menuRef) {
      toggleMenuBtnRef.current?.classList.toggle("open");
      menuRef.current?.classList.toggle("open");
    }
  };

  return (
    <div className="header">
      <div className="container-md d-flex align-items-center justify-content-between h-100 position-relative">
        <Link to="/" className="header__logo">
          <img src="/assets/images/Logo.png" alt="Logo Manchester United" />
        </Link>
        <div className="header__toggle-menu h-100 d-block d-md-none">
          <div
            className="header__toggle-menu__button"
            ref={toggleMenuBtnRef}
            onClick={handleToggleMenu}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="header__menu" ref={menuRef}>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
