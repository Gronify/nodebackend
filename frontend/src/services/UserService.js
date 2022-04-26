import $api from "../http";

export default class UserService {
  static async auth() {
    return $api.get("/user/auth");
  }
  static async getUsers() {
    return $api.get("/user/users");
  }
  static async putUser(id, username, email, password, role) {
    return $api.put("/user/user", { id, username, email, password, role });
  }
  static async createUser(username, email, password, role) {
    return $api.post("/user/user", { username, email, password, role });
  }
}
