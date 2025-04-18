import Weathercard from '../../assets/Group 130.svg'
import './WeatherCard.css';

function WeatherCard() {
    return (
        <section className="weather__card">
            <p className="weather__text">75 F</p>
            <img src={Weathercard} alt="Weather Card" className="weather__card_img" />
        </section>
    );
    }


  export default WeatherCard;