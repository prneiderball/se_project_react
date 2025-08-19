import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import ItemCloseIcon from "../../assets/closewhite.svg";

function ItemModal({
  isOpen,
  closeActiveModal,
  selectedCard,
  onConfirmDeleteRequest,
}) {
  const card = selectedCard;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?._id && card?.owner === currentUser?._id;

  if (!isOpen) return null;

  return (
    <div className="modal modal--visible">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
          <img src={ItemCloseIcon} alt="Close" />
        </button>

        {card && card._id ? (
          <>
            <img
              src={card.imageUrl}
              alt={card.name || "Item"}
              className="modal__image"
            />
            <div className="modal__footer">
              {isOwn && onConfirmDeleteRequest && (
                <button
                  onClick={() => onConfirmDeleteRequest(card._id)}
                  type="button"
                  className="modal__delete"
                  aria-label="Delete item"
                >
                  Delete item
                </button>
              )}
              <h2 className="modal__caption">{card.name || "No name"}</h2>
              <p className="modal__weather">Weather: {card.weather || "N/A"}</p>
            </div>
          </>
        ) : (
          <p>Loading item...</p>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
