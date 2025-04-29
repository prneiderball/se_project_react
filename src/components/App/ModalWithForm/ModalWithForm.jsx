import './ModalWithForm.css';
import CloseIcon from '../../../assets/closegray.svg'

function ModalWithForm({title, children, buttonText, activeModal, closeActiveModal}) {
    return (
      <div className={`modal ${activeModal === "add-garment" && "modal--visible"}`}>
        <div className="modal__content">
        <h2 className='modal__title'>{title}</h2>
        <button 
            onClick={closeActiveModal}
            type='button' 
            className='modal__close' 
          ><img src={CloseIcon} className="" /></button>
        <form 
          className='modal__form'
        >
{children}
            <button 
              type='button' 
              className='modal__submit'
            >
             {buttonText}
            </button>
            </form>
        </div>
      </div>
    );
  }
  
  export default ModalWithForm;
  