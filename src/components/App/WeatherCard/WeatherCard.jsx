import { weatherConditions } from "../../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.temp || weatherData.temp.F === undefined) {
    return <div>Weather data is loading...</div>;
  }

  const roundedTemp = Math.round(Number(weatherData.temp.F));

  const weatherCondition = weatherConditions.find(
    (condition) =>
      condition.condition === weatherData.description &&
      condition.day === weatherData.isDayTime
  );

  return (
    <section className="weather__card">
      <p className="weather__text">{roundedTemp} &deg; F</p>
      <img
        src={weatherCondition?.url}
        alt="Weather"
        className="weather__card_img"
      />
    </section>
  );
}

export default WeatherCard;
