import ItemCard from "./ItemCard.jsx";
import WeatherCard from "./WeatherCard.jsx";
import { defaultClothingItems } from "../../utils/Constants.js";
import './Main.css';


function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
       <ul className="cards__list">
        {defaultClothingItems.map((item) => (
            <ItemCard key={item._id}/>
        ))}
       </ul>
      </section>
    </main>
  );
}

export default Main;
