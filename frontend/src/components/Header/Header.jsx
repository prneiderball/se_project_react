import "./Header.css";
import Logo from "../../assets/wtwrlogo.svg";
import Avatar from "../../assets/defaultavatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

export function Header({ onAddClick, weatherData }) {
  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="wtwr logo" />
      </Link>
      <p className="header__date">
        {getDate()}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button onClick={onAddClick} className="header__add-clothes-btn">
        + Add Clothes
      </button>
      <Link to="/profile" className="header__profile-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={Avatar}
            alt="User profile picture"
          />
        </div>
      </Link>
    </header>
  );
};

export default Header;