import $api from "../http";

export default class UserService {
  static async auth() {
    return $api.get("/user/auth");
  }
}
