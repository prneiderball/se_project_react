import ItemCard from "./ItemCard.jsx";
import WeatherCard from "./WeatherCard.jsx";
import './Main.css'

function Main() {
    return (
        <main>
            <WeatherCard />
            <section className="cards">
                <p className="cards__text">Today is 75 &deg; F / You may want to wear:</p>
            <ItemCard />
            </section>
        </main>
    );
}

  export default Main;