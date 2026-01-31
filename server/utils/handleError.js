const mongoose = require("mongoose");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("./statusCodes");

const handleError = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(BAD_REQUEST).json({ message: "Invalid data" });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
  }

  if (
    err instanceof mongoose.Error.DocumentNotFoundError ||
    ["User not found", "Item not found"].includes(err.message)
  ) {
    return res.status(NOT_FOUND).json({ message: err.message });
  }

  return res
    .status(SERVER_ERROR)
    .json({ message: "An error occurred on the server" });
};

module.exports = handleError;
