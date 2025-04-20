import React from 'react';
import './ItemCard.css';

function ItemCard({ item }) {
  console.log(item);

  return (
    <div className="card__container">
      <h2 className="card__title">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__image" />
    </div>
  );
}

export default ItemCard;
