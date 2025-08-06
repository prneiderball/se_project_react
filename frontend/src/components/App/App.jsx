import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit.jsx";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import { getWeatherData, parseWeatherData } from "../../utils/WeatherApi.js";
import {
  fetchClothingItems,
  postNewItem,
  deleteItem,
} from "../../utils/apiService.js";

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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleConfirmDeleteRequest = (itemId) => {
    setDeleteTarget(itemId);
    setActiveModal("delete-confirmation");
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      handleItemDelete(deleteTarget);
      setDeleteTarget(null);
      closeActiveModal();
    }
  };

  const handleItemDelete = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  const onAddClick = () => {
    setActiveModal("add-garment");
  };

  const onCardClick = (card) => {
    setActiveModal("ItemModal");
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

  useEffect(() => {
    fetchClothingItems()
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          link: item.imageUrl,
        }));
        setClothingItems(
          normalized.length === 0 ? defaultClothingItems : normalized
        );
      })
      .catch((error) => {
        console.error("Error loading items:", error);
      });
  }, []);

  const handleAddItemSubmit = (name, imageURL, temperature) => {
    const newItem = {
      name,
      imageUrl: imageURL,
      weather: temperature,
    };

    postNewItem(newItem)
      .then((savedItem) => {
        const normalizedItem = {
          ...savedItem,
          link: savedItem.imageUrl,
        };

        setClothingItems((prevItems) => [normalizedItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
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
            isCelsius={currentTemperatureUnit === "C"}
            onUnitToggle={handleToggleSwitchChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                  handleItemDelete={handleItemDelete}
                  handleConfirmDeleteRequest={handleConfirmDeleteRequest}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={onCardClick}
                  onAddClick={onAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
          handleAddItemSubmit={handleAddItemSubmit}
        />
        <ItemModal
          isOpen={activeModal === "ItemModal"}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          onDelete={handleItemDelete}
          onConfirmDeleteRequest={handleConfirmDeleteRequest}
        />
        <DeleteModal
          isOpen={activeModal === "delete-confirmation"}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeleteTarget(null);
            closeActiveModal();
          }}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
