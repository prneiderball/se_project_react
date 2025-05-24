import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../App/Header/Header.jsx";
import Main from "../App/Main/Main.jsx";
import AddItemModal from "../App/AddItemModal/AddItemModal.jsx";
import ItemModal from "../App/ItemModal/ItemModal.jsx";
import Footer from "../App/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeatherData, parseWeatherData } from "../../utils/WeatherApi.js";
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnit.jsx";
import { defaultClothingItems } from "../../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    description: "",
    isDayTime: true,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const onAddClick = () => {
    setActiveModal("add-garment");
  };

  const onCardClick = (card) => {
    setActiveModal("item-preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = parseWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  const [isCelsius, setIsCelsius] = useState(true);
  const handleUnitToggle = (value) => {
    setIsCelsius(value);
  };

  const handleAddItemSubmit = (name, imageURL, temperature) => {
    setClothingItems([
      { name, link: imageURL, weather: temperature },
      ...clothingItems,
    ]);
    closeActiveModal();
  };
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            onAddClick={onAddClick}
            weatherData={weatherData}
            isCelsius={isCelsius}
            onUnitToggle={handleUnitToggle}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route path="/profile" element={<p>PROFILE</p>} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={!!activeModal}
          closeActiveModal={closeActiveModal}
          handleAddItemSubmit={handleAddItemSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
