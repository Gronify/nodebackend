const ApiError = require("../error/api-error");
const hairdresserService = require("../services/hairdresser-service");

class HairdresserController {
  async create(req, res, next) {
    try {
      const { name, surname, sex, salary } = req.body;
      const hairdresser = await hairdresserService.create(
        name,
        surname,
        sex,
        salary
      );
      return res.status(201).json({ message: "hairdresser created" });
    } catch (e) {
      next(e);
    }
  }
  async edit(req, res, next) {
    try {
      const { id, name, surname, sex, salary } = req.body;
      const hairdresserData = await hairdresserService.edit(
        id,
        name,
        surname,
        sex,
        salary
      );

      return res.json(hairdresserData);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const hairdressers = await hairdresserService.getAll();
      return res.json(hairdressers);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new HairdresserController();
