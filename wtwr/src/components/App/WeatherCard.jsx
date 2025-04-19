import Weathercardimage from '../../assets/weathercard.svg'
import './WeatherCard.css';

function WeatherCard() {
    return (
        <section className="weather__card">
            <p className="weather__text">75 &deg; F</p>
            <img src={Weathercardimage} alt="Weather Card" className="weather__card_img" />
        </section>
    );
    }


  export default WeatherCard;