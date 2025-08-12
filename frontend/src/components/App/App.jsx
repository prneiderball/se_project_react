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
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import { getWeatherData, parseWeatherData } from "../../utils/weatherApi.js";
import {
  fetchClothingItems,
  postNewItem,
  updateUserProfile
} from "../../utils/apiService.js";
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

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(parseWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchClothingItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
      });
  }, []);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };
  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };
  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsEditProfileOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleAddItemSubmit = (item) => {
    postNewItem(item)
      .then((newItem) => setClothingItems((prev) => [newItem, ...prev]))
      .catch(console.error);
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const action = !isLiked ? addCardLike : removeCardLike;
    action(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        closeModals();
        return handleLogin({ email, password });
      })
      .catch(console.error);
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
        closeModals();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUserProfile(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            isLoggedIn={isLoggedIn}
            onAddClick={() => setActiveModal("add")}
            onLoginClick={openLoginModal}
            onRegisterClick={openRegisterModal}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  setActiveModal={setActiveModal}
                  setSelectedCard={setSelectedCard}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onAddClick={() => setActiveModal("add")}
                    onCardClick={setSelectedCard}
                    onEditProfile={() => setIsEditProfileOpen(true)}
                    onSignOut={handleSignOut}
                    onCardLike={handleCardLike}
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
          {isLoginOpen && (
            <LoginModal
              isOpen={isLoginOpen}
              closeActiveModal={closeModals}
              handleLogin={handleLogin}
              openSignUpModal={openRegisterModal}
            />
          )}
          {isRegisterOpen && (
            <RegisterModal
              isOpen={isRegisterOpen}
              closeActiveModal={closeModals}
              handleRegister={handleRegister}
            />
          )}
          {isEditProfileOpen && (
            <EditProfileModal
              isOpen={isEditProfileOpen}
              closeActiveModal={closeModals}
              handleUpdateUser={handleUpdateUser}
              currentUser={currentUser}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
