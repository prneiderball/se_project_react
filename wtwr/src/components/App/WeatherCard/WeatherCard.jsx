import Weathercardimage from "../../../assets/weathercard.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.temp || weatherData.temp.F === undefined) {
    return <div>Weather data is loading...</div>;
  }

  return (
    <section className="weather__card">
      <p className="weather__text">{weatherData.temp.F} &deg; F</p>
      <img
        src={Weathercardimage}
        alt="Weather Card"
        className="weather__card_img"
      />
    </section>
  );
}

export default WeatherCard;
