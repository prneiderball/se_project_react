import "./App.css";
import Header from "../App/Header/Header.jsx";
import Main from "../App/Main/Main.jsx";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../App/ItemModal/ItemModal.jsx";
import Footer from "../App/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeatherData, parseWeatherData } from "../../utils/WeatherApi.js";
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnit.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    description: "",
    isDayTime: true,
  });

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
          <Main weatherData={weatherData} onCardClick={onCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="Add Garment"
          buttonText="Add"
          isOpen={!!activeModal}
          closeActiveModal={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>

          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image Url"
            />
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__radio-legend">
              Select the weather type:
            </legend>

            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                name="temperature"
                type="radio"
                className="modal__radio-input"
              />
              <span>Hot</span>
            </label>

            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                name="temperature"
                type="radio"
                className="modal__radio-input"
              />
              <span>Warm</span>
            </label>

            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                name="temperature"
                type="radio"
                className="modal__radio-input"
              />
              <span>Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
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
