import { useContext } from "react";
import ItemCard from "../../App/ItemCard/ItemCard.jsx";
import WeatherCard from "../../App/WeatherCard/WeatherCard.jsx";
import { defaultClothingItems } from "../../../utils/constants.js";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../../utils/CurrentTemperatureUnit.jsx";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature =
    currentTemperatureUnit === "F"
      ? weatherData?.temp?.F
      : weatherData?.temp?.C;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature ?? "Loading..."} &deg; / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) =>
              Array.isArray(item.weather)
                ? item.weather.includes(weatherData?.type)
                : item.weather === weatherData?.type
            )
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
