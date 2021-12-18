import $api from "../http";

export default class ApplicationService {
  static async getAll() {
    return $api.get("/application/all");
  }
  static async put(id, name, text) {
    return $api.put("/application/", { id, name, text });
  }
  static async create(id, name, text) {
    return $api.post("/application/", { id, name, text });
  }
}
