import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Profile({
  onCardClick,
  onAddClick,
  clothingItems,
  onEditProfile,
  onSignOut,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfile={onEditProfile}
          onSignOut={onSignOut}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onAdd={onAddClick}
          clothingItems={userItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
