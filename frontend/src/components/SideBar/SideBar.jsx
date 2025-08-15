import "./SideBar.css";
import defaultAvatar from "../../assets/defaultavatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarSrc = currentUser?.avatar || defaultAvatar;
  const username = currentUser?.name || "Guest";

  return (
    <div className="sidebar">
  <div className="sidebar__profile">
    <img
      src={avatarSrc}
      alt={`${username} avatar`}
      className="sidebar__avatar"
    />
    <p className="sidebar__username">{username}</p>
  </div>

  <div className="sidebar__btns">
    <button type="button" className="sidebar__button" onClick={onEditProfile}>
      Change Profile Data
    </button>
    <button type="button" className="sidebar__button" onClick={onSignOut}>
      Sign Out
    </button>
  </div>
</div>

  );
}

export default SideBar;
