class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized() {
    return new ApiError(401, "User Unauthorized");
  }

  static Forbidden() {
    return new ApiError(403, "No Access");
  }
  static MethodNotAllowed() {
    return new ApiError(405, "Method Not Allowed...");
  }
}

module.exports = ApiError;
