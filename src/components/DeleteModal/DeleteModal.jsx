import "./DeleteModal.css";

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">
          Are you sure you want to delete this item? This action is irreversible.
        </h2>
        <div className="modal__actions">
          <button
            className="modal__button modal__button--confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
