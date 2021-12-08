const ApiError = require("../error/api-error");
const { User } = require("../models");

module.exports = function (role) {
  return async function (req, res, next) {
    try {
      const userData = await User.findOne({
        attributes: ["role"],
        where: { id: req.user.id },
      });
      if (userData.role !== role) {
        return next(ApiError.Forbidden());
      }
      next();
    } catch (e) {
      next(ApiError.Forbidden());
    }
  };
};
