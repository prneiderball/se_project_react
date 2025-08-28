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
  updateUserProfile,
  deleteItem,
  addCardLike,
  removeCardLike,
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

  const navigate = useNavigate();

  // Weather fetch
  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(parseWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return fetchClothingItems();
      })
      .then((items) => setClothingItems(items))
      .catch(() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
      });
  }, []);

  const handleOpenAddItemModal = () => setActiveModal("add");
  const handleOpenItemModal = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };
  const handleOpenLoginModal = () => setActiveModal("login");
  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleOpenEditProfileModal = () => setActiveModal("editProfile");
  const handleCloseModal = () => setActiveModal("");

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
    navigate("/");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        handleCloseModal();
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
        return fetchClothingItems();
      })
      .then((items) => {
        setClothingItems(items);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
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
    const action = !isLiked ? addCardLike : removeCardLike;
    action(_id)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUserProfile(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        handleCloseModal();
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
            onAddClick={handleOpenAddItemModal}
            onLoginClick={handleOpenLoginModal}
            onRegisterClick={handleOpenRegisterModal}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  onAddClick={handleOpenAddItemModal}
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
                    onAddClick={handleOpenAddItemModal}
                    onCardClick={handleOpenItemModal}
                    onEditProfile={handleOpenEditProfileModal}
                    onSignOut={handleSignOut}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add"}
            closeActiveModal={handleCloseModal}
            handleAddItemSubmit={handleAddItemSubmit}
          />

          <ItemModal
            isOpen={activeModal === "item"}
            selectedCard={selectedCard}
            closeActiveModal={handleCloseModal}
            onConfirmDeleteRequest={handleDeleteItem}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={handleCloseModal}
            handleLogin={handleLogin}
            openSignUpModal={handleOpenRegisterModal}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            closeActiveModal={handleCloseModal}
            handleRegister={handleRegister}
          />

          <EditProfileModal
            isOpen={activeModal === "editProfile"}
            closeActiveModal={handleCloseModal}
            handleUpdateUser={handleUpdateUser}
            currentUser={currentUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
