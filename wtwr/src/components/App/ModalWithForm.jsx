import { useEffect } from 'react';
import './ModalWithForm.css'

function ModalWithForm({name, title, buttonText, onClose, onSubmit, children}) {

    useEffect(() => {
        function handleEsc(evt) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
    
        document.addEventListener('keydown', handleEsc);
        return () => {
        document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    function handleSubmit (evt) {
        evt.preventDefault();
        onSubmit(evt);
    }

    return (
        <div 
        className={`modal modal_type_${name}`}
        onClick={onClose}>
            <div 
            className = "modal__content"
            onClick={(e) => e.stopPropagation()}>
                <button 
                className="modal__close-btn" 
                type='button' 
                onClick={onClose}>
                </button>

                <h2 className="modal__title">{title}</h2>

                <form 
                className="modal__form" 
                name={name} 
                onSubmit={handleSubmit}>
                    {children}
                    <button 
                    className="modal__submit-btn" 
                    type='submit'>
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;