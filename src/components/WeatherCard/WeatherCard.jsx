import { useContext } from "react";
import { weatherConditions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit.jsx";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  if (!weatherData || !weatherData.temp || weatherData.temp.F === undefined) {
    return <div>Weather data is loading...</div>;
  }

  const weatherCondition = weatherConditions.find(
    (condition) =>
      condition.condition === weatherData.description &&
      condition.day === weatherData.isDayTime
  );

  return (
    <section className="weather__card">
      <p className="weather__text">{currentTemperatureUnit==='F'? weatherData.temp.F : weatherData.temp.C} &deg;{currentTemperatureUnit}</p>
      <img
        src={weatherCondition?.url}
        alt="Weather"
        className="weather__card_img"
      />
    </section>
  );
}

export default WeatherCard;
