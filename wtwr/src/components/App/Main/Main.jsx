import ItemCard from "../../App/ItemCard/ItemCard.jsx";
import WeatherCard from "../../App/WeatherCard/WeatherCard.jsx";
import { defaultClothingItems } from "../../../utils/constants.js";
import "./Main.css";

function Main({ weatherData, onCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {roundedTemp} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={onCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
