import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";

function EditProfileModal({ isOpen, closeActiveModal, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      buttonText="Save"
    >
      <label className="modal__label" htmlFor="profile-name">
        Name
      </label>
      <input
        id="profile-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="profile-avatar">
        Avatar URL
      </label>
      <input
        id="profile-avatar"
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
