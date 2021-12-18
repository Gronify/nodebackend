const { Application } = require("../models");
const argon = require("argon2");
const tokenService = require("./token-service");
const ApiError = require("../error/api-error");
const logger = require("./logger-service");

class ApplicationService {
  async create(name, text) {
    if (typeof name === "undefined" || typeof text === "undefined") {
      throw ApiError.BadRequest(`Wrong json`);
    }

    const applicationCandidate = await Application.findOne({ where: { name } });
    if (applicationCandidate) {
      throw ApiError.BadRequest(`Application with name ${name} already exists`);
    }

    const application = await Application.create({
      name,
      text,
    });

    const applicationDto = {
      id: application.id,
      name: application.name,
      text: application.text,
    };

    return { application: applicationDto };
  }

  async edit(id, name, text) {
    const application = await Application.findOne({ where: { id } });
    if (!Application) {
      throw ApiError.BadRequest(`Application with id ${id} not exists`);
    }

    const updatedApplication = await application.update({
      name: name,
      text: text,
    });

    const applicationDto = {
      id: updatedApplication.id,
      name: updatedApplication.name,
      text: updatedApplication.text,
    };

    return { application: applicationDto };
  }
  async getAll() {
    const applications = await Application.findAll();
    return applications;
  }
}

module.exports = new ApplicationService();
