import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/Constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ onCardClick }) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__header">
          <p className="clothes-section_text">Your Items</p>
          <button className="additems">+ Add Item</button>
        </div>
      </div>
      <ul className="cards__list clothes-section__cards-list">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </>
  );
}

export default ClothesSection;
