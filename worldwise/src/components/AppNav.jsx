import React from "react";
import { nav } from "../styles/AppNav.module.css";
import { NavLink } from "react-router-dom";

const AppNav = () => {
  return (
    <nav className={nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="coutries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
