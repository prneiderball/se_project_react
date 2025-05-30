import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({onCardClick, onAddClick}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection onCardClick={onCardClick} onAdd={onAddClick}/>
      </section>
    </div>
  );
}

export default Profile;
