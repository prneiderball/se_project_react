import { useContext } from "react";
import ItemCard from "../../App/ItemCard/ItemCard.jsx";
import WeatherCard from "../../App/WeatherCard/WeatherCard.jsx";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../../utils/CurrentTemperatureUnit.jsx";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature =
    currentTemperatureUnit === "F"
      ? weatherData?.temp?.F
      : weatherData?.temp?.C;

  const displayTemp = temperature !== 999 ? `${temperature}°` : "Loading...";

  const isWeatherReady = weatherData?.type;

  const filteredItems = isWeatherReady
    ? clothingItems.filter((item) =>
        Array.isArray(item.weather)
          ? item.weather.includes(weatherData.type)
          : item.weather === weatherData.type
      )
    : [];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))
          ) : (
            <p className="cards__empty">
              {isWeatherReady
                ? "No matching clothing items found for today's weather."
                : "Loading recommendations..."}
            </p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
