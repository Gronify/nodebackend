const ApiError = require("../error/api-error");

module.exports = function (err, req, res, next) {
  console.log("\x1b[31m", err, "\x1b[0m");
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unexpected error" });
};
