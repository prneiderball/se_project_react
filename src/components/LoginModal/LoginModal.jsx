import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function LoginModal({
  isOpen = false,
  closeActiveModal,
  handleLogin,
  openSignUpModal
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
    setEmail("");
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>

      <div className="modal__actions">
        <button
          type="submit"
          className="modal__submit"
          disabled={!email || !password}
        >
          Log In
        </button>
        <span className="modal__alt" onClick={openSignUpModal}>
          or Sign Up
        </span>
      </div>
    </ModalWithForm>
  );
}
