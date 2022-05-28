import $api from "../http";

export default class ApplicationService {
  static async getAll() {
    return $api.get("/application/");
  }

  static async getNotReady() {
    return $api.get("/application/notReady");
  }

  static async put(id, name, surname, order, price, status) {
    return $api.put("/application/", {
      id,
      name,
      surname,
      order,
      price,
      status,
    });
  }
  static async create(id, name, surname, order, price, status) {
    return $api.post("/application/", {
      id,
      name,
      surname,
      order,
      price,
      status,
    });
  }
  static async connectToHairdresser(applicationId, hairdresserId) {
    return $api.put("/application/applicationConnected", {
      applicationId,
      hairdresserId,
    });
  }

  static async connectToHairdresserByUser(applicationId) {
    return $api.put("/application/applicationHairdresser", {
      applicationId,
    });
  }
}
