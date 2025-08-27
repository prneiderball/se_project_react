import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({
  onCardClick,
  onAdd,
  clothingItems = [],
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your Items</p>
        <button onClick={onAdd} className="additems">
          + Add Item
        </button>
      </div>

      {clothingItems.length > 0 ? (
        <ul className="cards__list clothes-section__cards-list">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      ) : (
        <p className="clothes-section__empty">
          You haven’t added any items yet.
        </p>
      )}
    </div>
  );
}

export default ClothesSection;
