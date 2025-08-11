import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Profile from "../Profile/Profile.jsx";

import { getWeatherData, parseWeatherData } from "../../utils/weatherApi.js";
import { fetchClothingItems, postNewItem } from "../../utils/apiService.js";
import { signup, signin, checkToken } from "../../utils/auth.js";

import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit.jsx";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Fetch weather data on mount
  useEffect(() => {
    getWeatherData()
      .then((data) => {
        const filteredData = parseWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  // Fetch clothing items on mount
  useEffect(() => {
    fetchClothingItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Clothing fetch error:", err));
  }, []);

  // Check JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check error:", err);
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
      });
  }, []);

  // Handlers
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleAddItemSubmit = (item) => {
    postNewItem(item)
      .then((newItem) => setClothingItems((prev) => [newItem, ...prev]))
      .catch((err) => console.error("Add item error:", err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => console.error("Register error:", err));
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate("/profile");
      })
      .catch((err) => console.error("Login error:", err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header isLoggedIn={isLoggedIn} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  setActiveModal={setActiveModal}
                  setSelectedCard={setSelectedCard}
                />
              }
            />

            <Route
              path="/login"
              element={
                <LoginModal
                  closeActiveModal={() => navigate("/")}
                  handleLogin={handleLogin}
                />
              }
            />

            <Route
              path="/register"
              element={
                <RegisterModal
                  closeActiveModal={() => navigate("/")}
                  handleRegister={handleRegister}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    setActiveModal={setActiveModal}
                    setSelectedCard={setSelectedCard}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {activeModal === "add" && (
            <AddItemModal
              closeActiveModal={() => setActiveModal("")}
              handleAddItemSubmit={handleAddItemSubmit}
            />
          )}
          {activeModal === "item" && (
            <ItemModal
              selectedCard={selectedCard}
              closeActiveModal={() => setActiveModal("")}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
