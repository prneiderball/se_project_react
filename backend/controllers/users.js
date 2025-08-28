const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!name || !avatar || !email || !password) {
      return next(new BadRequestError("All fields are required"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return next(new ConflictError("Email already in use"));
    }
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      new Error("User not found")
    );
    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError("Invalid user ID"));
    }
    if (err.message === "User not found") {
      return next(new NotFoundError("User not found"));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError("Email and password are required"));
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token });
  } catch (err) {
    if (err.message === "Incorrect email or password") {
      return next(new UnauthorizedError("Incorrect email or password"));
    }
    return next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    if (!name && !avatar) {
      return next(new BadRequestError("At least one field (name or avatar) is required"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...(name && { name }), ...(avatar && { avatar }) },
      { new: true, runValidators: true }
    ).orFail(new Error("User not found"));

    return res.json(updatedUser);
  } catch (err) {
    if (err.message === "User not found") {
      return next(new NotFoundError("User not found"));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
};
