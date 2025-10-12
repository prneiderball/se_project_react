const BadRequestError = require("./badRequestError");
const ConflictError = require("./conflictError");
const UnauthorizedError = require("./unauthorizedError");
const ForbiddenError = require("./forbiddenError");
const NotFoundError = require("./notFoundError");

module.exports = {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
