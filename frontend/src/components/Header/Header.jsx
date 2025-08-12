import "./Header.css";
import Logo from "../../assets/wtwrlogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export function Header({
  onAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const avatarContent = currentUser?.avatar ? (
    <img
      className="header__avatar"
      src={currentUser.avatar}
      alt={`${currentUser.name} profile`}
    />
  ) : (
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

      {isLoggedIn ? (
        <>
          <button onClick={onAddClick} className="header__add-clothes-btn">
            + Add Clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {avatarContent}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button onClick={onLoginClick} className="header__login-btn">
            Log In
          </button>
          <button onClick={onRegisterClick} className="header__register-btn">
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
