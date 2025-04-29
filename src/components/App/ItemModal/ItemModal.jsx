import "./ItemModal.css";
import ItemCloseIcon from "../../../assets/closewhite.svg";

function ItemModal({ activeModal, closeActiveModal, card }) {
  return (
    <div
      className={`modal ${activeModal === "item-preview" && "modal--visible"}`}
    >
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
          src={card?.link || ""}
          alt={card?.name || "Item"}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card?.name || "No name"}</h2>
          <p className="modal__weather">Weather: {card?.weather || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
