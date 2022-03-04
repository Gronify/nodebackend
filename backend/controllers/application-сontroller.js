const ApiError = require("../error/api-error");
const applicationService = require("../services/application-service");

class ApplicationController {
  async create(req, res, next) {
    try {
      const { name, surname, order, price, status } = req.body;

      const application = await applicationService.create(
        name,
        surname,
        order,
        price,
        status
      );
      return res.status(201).json({ message: "application created" });
    } catch (e) {
      next(e);
    }
  }
  async edit(req, res, next) {
    try {
      const { id, name, surname, order, price, status } = req.body;
      const applicationData = await applicationService.edit(
        id,
        name,
        surname,
        order,
        price,
        status
      );

      return res.json(applicationData);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const applications = await applicationService.getAll();
      return res.json(applications);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ApplicationController();
