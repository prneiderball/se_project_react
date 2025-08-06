const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const handleError = require("../utils/handleError");
const {
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!name || !avatar || !email || !password) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "All fields are required" });
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

    return res.status(201).send(userResponse);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(CONFLICT).send({ message: "Email already in use" });
    }

    return handleError(err, res);
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      new Error("User not found")
    );
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
    }
    if (err.message === "User not found") {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

// User login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Update current user's profile (name and avatar only)
const updateUserProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    if (!name && !avatar) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "At least one field (name or avatar) is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...(name && { name }), ...(avatar && { avatar }) },
      {
        new: true,
        runValidators: true,
      }
    ).orFail(new Error("User not found"));

    return res.send(updatedUser);
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }
    return handleError(err, res);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
};
