import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ onCardClick, onAdd, clothingItems }) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__header">
          <p className="clothes-section_text">Your Items</p>
          <button onClick={onAdd} className="additems">+ Add Item</button>
        </div>
      </div>
      <ul className="cards__list clothes-section__cards-list">
        {clothingItems.map((item) => (
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
