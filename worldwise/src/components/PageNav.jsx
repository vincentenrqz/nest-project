import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/PageNav.module.css";
import Logo from "./Logo";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Logo />
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
