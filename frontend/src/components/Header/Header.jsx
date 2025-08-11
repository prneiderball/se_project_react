import "./Header.css";
import Logo from "../../assets/wtwrlogo.svg";
import Avatar from "../../assets/defaultavatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export function Header({ onAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  // If no avatar is provided, we'll use the first letter of the name
  const avatarContent = currentUser?.avatar
    ? (
      <img
        className="header__avatar"
        src={currentUser.avatar}
        alt={`${currentUser.name} profile`}
      />
    )
    : (
      <div className="header__avatar-placeholder">
        {currentUser?.name?.[0]?.toUpperCase() || "?"}
      </div>
    );

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="wtwr logo" />
      </Link>
      <p className="header__date">
        {getDate()}, {weatherData?.city || "Loading..."}
      </p>
      <ToggleSwitch />
      {currentUser ? (
        <>
          <button onClick={onAddClick} className="header__add-clothes-btn">
            + Add Clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {avatarContent}
            </div>
          </Link>
        </>
      ) : (
        <Link to="/login" className="header__login-btn">Log In</Link>
      )}
    </header>
  );
}

export default Header;
