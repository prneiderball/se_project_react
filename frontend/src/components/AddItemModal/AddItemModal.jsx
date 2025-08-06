import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  isOpen,
  closeActiveModal,
  handleAddItemSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [temperature, setTemperature] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleTemperatureChange = (e) => setTemperature(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit(name, imageUrl, temperature);
    setName("");
    setImageUrl("");
    setTemperature("");
  };

  return (
    <ModalWithForm
      title="Add Garment"
      buttonText="Add"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          onChange={handleImageUrlChange}
          value={imageUrl}
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__radio-legend">
          Select the weather type:
        </legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="temperature"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleTemperatureChange}
            checked={temperature === "hot"}
            required
          />
          <span>Hot</span>
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="temperature"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleTemperatureChange}
            checked={temperature === "warm"}
            required
          />
          <span>Warm</span>
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="temperature"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleTemperatureChange}
            checked={temperature === "cold"}
            required
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
