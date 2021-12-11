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
}

module.exports = new ApplicationService();