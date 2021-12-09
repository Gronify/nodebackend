const ApiError = require("../error/api-error");
const logger = require("../services/logger-service");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    logger.warn(err);
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  logger.error(err);
  return res.status(500).json({ message: "Unexpected error" });
};
