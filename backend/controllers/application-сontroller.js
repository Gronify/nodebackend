const ApiError = require("../error/api-error");
const applicationService = require("../services/application-service");

class ApplicationController {
  async create(req, res, next) {
    try {
      const { name, text } = req.body;
      const application = await applicationService.create(name, text);
      return res.status(201).json({ message: "application created" });
    } catch (e) {
      next(e);
    }
  }
  async edit(req, res, next) {
    try {
      throw ApiError.MethodNotAllowed();
    } catch (e) {
      next(e);
    }
  }
  async get(req, res, next) {
    try {
      throw ApiError.MethodNotAllowed();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ApplicationController();
