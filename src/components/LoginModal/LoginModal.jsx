import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

export default function LoginModal({
  isOpen = false,
  closeActiveModal,
  handleLogin,
  openSignUpModal,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
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
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>

      <div className="modal__actions">
        <button
          type="submit"
          className="modal__submit"
          disabled={!values.email || !values.password}
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
