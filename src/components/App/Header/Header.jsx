import "./Header.css";
import Logo from "../../../assets/wtwrlogo.svg";
import Avatar from "../../../assets/defaultavatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({ onAddClick, weatherData }) {
  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="wtwr logo" />
      <p className="header__date">
        {getDate()}, {weatherData.city}
      </p>
      <ToggleSwitch isCelsius={isCelsius} onToggle={onUnitToggle} />
      <button onClick={onAddClick} className="header__addclothes--btn">
        + Add Clothes
      </button>
      <div className="header__user--container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={Avatar} alt="User profile picture" />
      </div>
    </header>
  );
}

export default Header;
