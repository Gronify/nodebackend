const ApiError = require("../error/api-error");
const servicesService = require("../services/services-service");

class ServicesController {
  async create(req, res, next) {
    try {
      const { name, description, sex, price } = req.body;
      const service = await servicesService.create(
        name,
        description,
        sex,
        price
      );
      return res.status(201).json({ message: "service created" });
    } catch (e) {
      next(e);
    }
  }
  async edit(req, res, next) {
    try {
      const { id, name, description, sex, price } = req.body;
      const serviceData = await servicesService.edit(
        id,
        name,
        description,
        sex,
        price
      );

      return res.json(serviceData);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const services = await servicesService.getAll();
      return res.json(services);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ServicesController();
