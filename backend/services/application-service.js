const { Application } = require("../models");
const argon = require("argon2");
const tokenService = require("./token-service");
const ApiError = require("../error/api-error");
const logger = require("./logger-service");

class ApplicationService {
  async create(name, surname, order, price, status) {
    if (typeof name === "undefined" || typeof surname === "undefined") {
      throw ApiError.BadRequest(`Wrong json`);
    }

    const applicationCandidate = await Application.findOne({ where: { name } });
    // if (applicationCandidate) {
    //   throw ApiError.BadRequest(`Application with name ${name} already exists`);
    // }

    const application = await Application.create({
      name,
      surname,
      order,
      price,
      status,
    });

    const applicationDto = {
      id: application.id,
      name: application.name,
      surname: application.surname,
      order: application.order,
      price: application.price,
      status: application.status,
    };

    return { application: applicationDto };
  }

  async edit(id, name, surname, order, price, status) {
    const application = await Application.findOne({ where: { id } });
    if (!Application) {
      throw ApiError.BadRequest(`Application with id ${id} not exists`);
    }

    const updatedApplication = await application.update({
      name,
      surname,
      order,
      price,
      status,
    });

    const applicationDto = {
      id: updatedApplication.id,
      name: updatedApplication.name,
      surname: updatedApplication.surname,
      order: updatedApplication.order,
      price: updatedApplication.price,
      status: updatedApplication.status,
    };

    return { application: applicationDto };
  }
  async getAll() {
    const applications = await Application.findAll();
    return applications;
  }
}

module.exports = new ApplicationService();
