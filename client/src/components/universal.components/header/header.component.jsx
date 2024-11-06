import { NavLink } from "react-router-dom";
import "./header.styles.scss";

export const Header = () => {
  return (
    <header className="header">
      <nav className="title">
        <NavLink to="/">
          <h1>Authentication App</h1>
        </NavLink>
      </nav>
      <nav className="nav-items">
        <NavLink to="/">
          <div className="nav-item">Home</div>
        </NavLink>
        <NavLink to="/about">
          <div className="nav-item">About</div>
        </NavLink>
        <NavLink to="/contact">
          <div className="nav-item">Contact</div>
        </NavLink>
      </nav>
      <nav className="nav-btns">
        <NavLink to="/login">
          <div className="nav-btn">Login</div>
        </NavLink>
        <NavLink to="/register">
          <div className="nav-btn">Register</div>
        </NavLink>
      </nav>
    </header>
  );
};
