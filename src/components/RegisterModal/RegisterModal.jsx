import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function RegisterModal({ isOpen, closeActiveModal, handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password, name, avatar: avatarUrl });
    setEmail("");
    setPassword("");
    setName("");
    setAvatarUrl("");
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          name="email"
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          name="password"
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          name="avatarUrl"
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
          required
        />
      </label>
    </ModalWithForm>
  );
}
