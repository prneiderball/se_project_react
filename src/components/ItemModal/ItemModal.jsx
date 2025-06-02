import "./ItemModal.css";
import ItemCloseIcon from "../../assets/closewhite.svg";

function ItemModal({ isOpen, closeActiveModal, card, onConfirmDeleteRequest }) {
  return (
    <div className={`modal ${isOpen && "modal--visible"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
          <img src={ItemCloseIcon} alt="Close" />
        </button>
        <img
          src={card.link}
          alt={card.name || "Item"}
          className="modal__image"
        />
        <div className="modal__footer">
          <button
            onClick={() => {
              onConfirmDeleteRequest(card._id);
            }}
            type="button"
            className="modal__delete"
            aria-label="Delete item"
          >
            Delete item
          </button>

          <h2 className="modal__caption">{card.name || "No name"}</h2>
          <p className="modal__weather">Weather: {card.weather || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
