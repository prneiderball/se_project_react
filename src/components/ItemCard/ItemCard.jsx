import React, { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.jsx";
import "./ItemCard.css";
import likedIcon from "../../assets/liked.svg";
import unlikedIcon from "../../assets/unliked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>

        {currentUser && (
          <button
            className="card__like-button"
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <img
              src={isLiked ? likedIcon : unlikedIcon}
              alt={isLiked ? "Liked" : "Unliked"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      <img
        onClick={() => onCardClick(item)}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
