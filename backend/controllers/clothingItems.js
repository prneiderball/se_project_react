const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItems");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
  UNAUTHORIZED,
} = require("../utils/errors");

const createItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    const { name, weather, imageUrl } = req.body;

    const newItem = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });

    return res.status(201).json(newItem);
  } catch (err) {
    console.error("CREATE ITEM ERROR:", err);
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data" });
    }
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const getItems = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    const items = await ClothingItem.find({ owner: req.user._id });
    return res.status(200).json(items);
  } catch (err) {
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const deleteItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    const { itemId } = req.params;

    const item = await ClothingItem.findById(itemId).orFail(
      new Error("Item not found")
    );

    if (item.owner.toString() !== req.user._id.toString()) {
      return res
        .status(FORBIDDEN)
        .json({ message: "You do not have permission to delete this item" });
    }

    await item.deleteOne();
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }
    if (err.message === "Item not found") {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const likeItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(new Error("Item not found"));

    return res.status(200).json(item);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }
    if (err.message === "Item not found") {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const dislikeItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(new Error("Item not found"));

    return res.status(200).json(item);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }
    if (err.message === "Item not found") {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
