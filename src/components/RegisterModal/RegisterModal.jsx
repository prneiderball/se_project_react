import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

export default function RegisterModal({
  isOpen,
  closeActiveModal,
  handleRegister,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  // Reset form only when the modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatarUrl: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatarUrl,
    });
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
          onChange={handleChange}
          value={values.email}
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
          onChange={handleChange}
          value={values.password}
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
          onChange={handleChange}
          value={values.name}
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
          onChange={handleChange}
          value={values.avatarUrl}
          required
        />
      </label>
    </ModalWithForm>
  );
}
