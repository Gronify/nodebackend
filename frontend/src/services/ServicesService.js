import $api from "../http";

export default class ServicesService {
  static async getAll() {
    return $api.get("/services/");
  }
  static async put(id, name, description, sex, price) {
    return $api.put("/services/", {
      id,
      name,
      description,
      sex,
      price,
    });
  }
  static async create(id, name, description, sex, price) {
    return $api.post("/services/", {
      id,
      name,
      description,
      sex,
      price,
    });
  }
}
