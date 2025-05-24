import "./Profile.css";
import SideBar from "../SideBar/SideBar";

function Profile() {
  return (
    <div>
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section"></section>
    </div>
  );
}

export default Profile;
