const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItems");
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

const createItem = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new UnauthorizedError("Unauthorized"));
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
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data"));
    }
    return next(err);
  }
};


const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new UnauthorizedError("Unauthorized"));
    }

    const { itemId } = req.params;

    const item = await ClothingItem.findById(itemId).orFail(
      new Error("Item not found")
    );

    if (item.owner.toString() !== req.user._id.toString()) {
      return next(new ForbiddenError("You do not have permission to delete this item"));
    }

    await item.deleteOne();
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError("Invalid item ID"));
    }
    if (err.message === "Item not found") {
      return next(new NotFoundError("Item not found"));
    }
    return next(err);
  }
};

const likeItem = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new UnauthorizedError("Unauthorized"));
    }

    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(new Error("Item not found"));

    return res.status(200).json(item);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError("Invalid item ID"));
    }
    if (err.message === "Item not found") {
      return next(new NotFoundError("Item not found"));
    }
    return next(err);
  }
};

const dislikeItem = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new UnauthorizedError("Unauthorized"));
    }

    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(new Error("Item not found"));

    return res.status(200).json(item);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError("Invalid item ID"));
    }
    if (err.message === "Item not found") {
      return next(new NotFoundError("Item not found"));
    }
    return next(err);
  }
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
