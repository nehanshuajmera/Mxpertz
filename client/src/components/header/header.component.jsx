import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import { CustomButton } from "../custom-button/custom-button.component";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <h1 className="heading-primary">Brainy Lingo</h1>
        </Link>
      </div>
      <div className="header__links">
        <div className="link">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="link">
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </div>
        <div className="link">
          <NavLink to="/dailyquiz">Daily Quiz</NavLink>
        </div>
        <div className="link">
          <NavLink to="/genre">Genre</NavLink>
        </div>
      </div>
      <div className="header__btn">
        <CustomButton bgdark >Sign Out</CustomButton>
      </div>
    </header>
  );
};
