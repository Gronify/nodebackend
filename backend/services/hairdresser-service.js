const { Hairdresser, User } = require("../models");
const ApiError = require("../error/api-error");
const logger = require("./logger-service");
const userService = require("./user-service");

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

  async createWithUser(username, email, password, name, surname, sex, salary) {
    if (typeof name === "undefined" || typeof surname === "undefined") {
      throw ApiError.BadRequest(`Wrong json`);
    }

    try {
      const user = await userService.registration(username, email, password);
      const newUser = await User.findOne({ where: { id: user.user.id } });
      console.log(newUser);
      await newUser.update({
        role: "HAIRDRASSER",
      });

      const hairdresser = await Hairdresser.create({
        name,
        surname,
        sex,
        salary,
        userId: user.user.id,
      });

      const hairdresserDto = {
        id: hairdresser.id,
        name: hairdresser.name,
        surname: hairdresser.surname,
        sex: hairdresser.sex,
        salary: hairdresser.salary,
      };

      return { hairdresser: hairdresserDto };
    } catch (error) {
      throw ApiError.BadRequest(error);
    }
  }
}

module.exports = new HairdresserService();
