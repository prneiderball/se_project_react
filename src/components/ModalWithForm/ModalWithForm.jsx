import "./ModalWithForm.css";
import CloseIcon from "../../assets/closegray.svg";

function ModalWithForm({
  title,
  children,
  buttonText,
  isOpen,
  closeActiveModal,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal--visible" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={CloseIcon} alt="Close icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          {buttonText && (
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;