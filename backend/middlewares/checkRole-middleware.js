const { ADMIN } = require("../constants/roles");
const ApiError = require("../error/api-error");
const { User } = require("../models");

module.exports = function (role) {
  return async function (req, res, next) {
    try {
      //TODO: redo
      const userData = await User.findOne({
        attributes: ["role"],
        where: { id: req.user.id },
      });
      if (userData.role !== role && userData.role !== ADMIN.name) {
        return next(ApiError.Forbidden());
      }
      next();
    } catch (e) {
      next(ApiError.Forbidden());
    }
  };
};
