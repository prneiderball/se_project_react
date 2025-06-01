import "./DeleteModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function DeleteModal({ isOpen, onConfirm, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      closeActiveModal={onCancel}
      onSubmit={handleSubmit}
    >
      <p className="modal__text">
        Are you sure you want to delete this item?  
        This action is irreversible.
      </p>
      <div className="modal__buttons">
        <button
          type="submit"
          className="modal__button-confirm"
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__button-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}
