const { Services } = require("../models");
const ApiError = require("../error/api-error");
const logger = require("./logger-service");

class ServicesService {
  async create(name, description, sex, price) {
    if (typeof name === "undefined" || typeof description === "undefined") {
      throw ApiError.BadRequest(`Wrong json`);
    }
    const servicesCandidate = await Services.findOne({ where: { name } });

    const service = await Services.create({
      name,
      description,
      sex,
      price,
    });

    const serviceDto = {
      id: service.id,
      name: service.name,
      description: service.description,
      sex: service.sex,
      price: service.price,
    };

    return { service: serviceDto };
  }

  async edit(id, name, description, sex, price) {
    const service = await Services.findOne({ where: { id } });
    if (!service) {
      throw ApiError.BadRequest(`Application with id ${id} not exists`);
    }

    const updatedService = await service.update({
      name,
      description,
      sex,
      price,
    });

    const servicerDto = {
      id: updatedService.id,
      name: updatedService.name,
      description: updatedService.description,
      sex: updatedService.sex,
      price: updatedService.price,
    };

    return { servicer: servicerDto };
  }
  async getAll() {
    const services = await Services.findAll();
    return services;
  }
}

module.exports = new ServicesService();
