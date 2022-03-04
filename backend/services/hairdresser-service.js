const { Hairdresser } = require("../models");
const ApiError = require("../error/api-error");
const logger = require("./logger-service");

class HairdresserService {
  async create(name, surname, sex, salary) {
    if (typeof name === "undefined" || typeof surname === "undefined") {
      throw ApiError.BadRequest(`Wrong json`);
    }
    const hairdresserCandidate = await Hairdresser.findOne({ where: { name } });

    const hairdresser = await Hairdresser.create({
      name,
      surname,
      sex,
      salary,
    });

    const hairdresserDto = {
      id: hairdresser.id,
      name: hairdresser.name,
      surname: hairdresser.surname,
      sex: hairdresser.sex,
      salary: hairdresser.salary,
    };

    return { hairdresser: hairdresserDto };
  }

  async edit(id, name, surname, sex) {
    const hairdresser = await Hairdresser.findOne({ where: { id } });
    if (!Hairdresser) {
      throw ApiError.BadRequest(`Application with id ${id} not exists`);
    }

    const updatedHairdresser = await hairdresser.update({
      name,
      surname,
      sex,
      salary,
    });

    const hairdresserDto = {
      id: updatedHairdresser.id,
      name: updatedHairdresser.name,
      surname: updatedHairdresser.surname,
      sex: updatedHairdresser.sex,
      salary: updatedHairdresser.salary,
    };

    return { hairdresser: hairdresserDto };
  }
  async getAll() {
    const hairdressers = await Hairdresser.findAll();
    return hairdressers;
  }
}

module.exports = new HairdresserService();
