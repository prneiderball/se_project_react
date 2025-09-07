import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import ItemCloseIcon from "../../assets/closewhite.svg";

function ItemModal({
  isOpen,
  closeActiveModal,
  selectedCard,
  onConfirmDeleteRequest,
  isLoading = false,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard?._id && selectedCard?.owner === currentUser?._id;

  if (!isOpen) return null;

  const handleDelete = () => {
    if (onConfirmDeleteRequest && selectedCard._id) {
      onConfirmDeleteRequest(selectedCard._id);
    }
  };

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

        {selectedCard && selectedCard._id ? (
          <>
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.name || "Item"}
              className="modal__image"
            />
            <div className="modal__footer">
              {isOwn && onConfirmDeleteRequest && (
                <button
                  onClick={handleDelete}
                  type="button"
                  className="modal__delete"
                  aria-label="Delete item"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete item"}
                </button>
              )}
              <h2 className="modal__caption">{selectedCard.name || "No name"}</h2>
              <p className="modal__weather">
                Weather: {selectedCard.weather || "N/A"}
              </p>
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
