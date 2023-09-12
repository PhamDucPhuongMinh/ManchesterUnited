import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  const handleClick = () => {
    if (window.innerWidth < 768) {
      const toggleBtn: HTMLElement | null = document.querySelector(
        ".header__toggle-menu__button.open"
      );
      const menu: HTMLElement | null =
        document.querySelector(".header__menu.open");
      if (toggleBtn && menu) {
        toggleBtn.classList.remove("open");
        menu.classList.remove("open");
      }
    }
  };

  return (
    <div className="menu h-100">
      <ul className="menu__list h-100 mb-0 d-flex align-items-center flex-column flex-md-row">
        <li className="menu__item h-100">
          <Link
            to="/"
            className="d-flex align-items-center px-4 h-100 text-decoration-none text-white fw-bold"
            onClick={handleClick}
          >
            Home
          </Link>
        </li>
        <li className="menu__item h-100">
          <Link
            to="/players"
            className="d-flex align-items-center px-4 h-100 text-decoration-none text-white fw-bold"
            onClick={handleClick}
          >
            Players
          </Link>
        </li>
        <li className="menu__item h-100">
          <Link
            to="/trophies"
            className="d-flex align-items-center px-4 h-100 text-decoration-none text-white fw-bold"
            onClick={handleClick}
          >
            Trophies
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
