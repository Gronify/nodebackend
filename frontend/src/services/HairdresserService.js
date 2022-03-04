import $api from "../http";

export default class HairdresserService {
  static async getAll() {
    return $api.get("/hairdresser/");
  }
  static async put(id, name, surname, sex, salary) {
    return $api.put("/hairdresser/", {
      id,
      name,
      surname,
      sex,
      salary,
    });
  }
  static async create(id, name, surname, sex, salary) {
    return $api.post("/hairdresser/", {
      id,
      name,
      surname,
      sex,
      salary,
    });
  }
}
