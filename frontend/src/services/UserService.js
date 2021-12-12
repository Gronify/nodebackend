import $api from "../http";

export default class UserService {
  static async auth() {
    return $api.get("/user/auth");
  }
  static async getUsers() {
    return $api.get("/user/users");
  }
}
