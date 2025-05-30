function ItemModal({ isOpen, closeActiveModal, card, onConfirmDeleteRequest }) {
  return (
    <div className={`modal ${isOpen ? "modal--visible" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={closeActiveModal} ...>
          <img src={ItemCloseIcon} alt="Close" />
        </button>
        <img src={card?.link} alt={card?.name} className="modal__image" />
        <div className="modal__footer">
          <button
            onClick={() => onConfirmDeleteRequest(card?._id)}
            className="modal__delete"
          >
            Delete item
          </button>
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}
