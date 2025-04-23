import ItemCard from "./ItemCard.jsx";
import WeatherCard from "./WeatherCard.jsx";
import { defaultClothingItems } from "../../utils/Constants.js";
import './Main.css';

function Main({weatherData}) {
  return (
    <main>
      <WeatherCard />
      <section className="main">
        <p className="main__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
  {defaultClothingItems
    .filter((item) => item.weather === weatherData.type)
    .map((item) => (
      <ItemCard key={item._id} item={item} />
    ))}
</ul>

      </section>
    </main>
  );
}

export default Main;
