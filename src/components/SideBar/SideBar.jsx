import "./SideBar.css";
import avatar from "../../assets/defaultavatar.svg";

function SideBar () {
  return (
    <div className="sidebar">
        <img src={avatar} alt="default avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
