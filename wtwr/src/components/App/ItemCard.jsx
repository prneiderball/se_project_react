import './ItemCard.css';

function ItemCard({ items = [], currentWeather = 'hot' }) {
  const filteredItems = items.filter(item => item.weather === currentWeather);

  return (
    <>
      {filteredItems.map(item => (
        <div key={item._id} className="card__container">
          <h2 className="card__title">{item.name}</h2>
          <img src={item.link} alt={item.name} className="card__image" />
        </div>
      ))}
    </>
  );
}

export default ItemCard;
