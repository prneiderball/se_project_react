import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";

function EditProfileModal({ isOpen, closeActiveModal, handleUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Initialize form when modal opens or currentUser changes
  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values);
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="modal__label" htmlFor="profile-name">
        Name
      </label>
      <input
        id="profile-name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="profile-avatar">
        Avatar URL
      </label>
      <input
        id="profile-avatar"
        name="avatar"
        type="url"
        value={values.avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
