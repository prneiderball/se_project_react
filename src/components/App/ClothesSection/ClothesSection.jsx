import './ClothesSection.css';
import {defaultClothingItems} from '../../../utils/Constants.js';
import ItemCard from '../ItemCard/ItemCard.jsx';

function ClothesSection() {
  return (
    <>
      <div className="clothes-section">
        <p className="clothes-section_text">Your Items</p>
        <button className="additems">+ Add Item</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              //pass as prop
              //handleCardClick={onCardClick}
            />
          ))}
      </ul>
    </>
  );
}

export default ClothesSection;
