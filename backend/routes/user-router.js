const Router = require("express");
const router = new Router();
const userController = require("../controllers/user-сontroller");
const authMiddleware = require("../middlewares/auth-middleware");
const checkRoleMiddleware = require("../middlewares/checkRole-middleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/auth", authMiddleware, userController.check);
router.get(
  "/authAdmin",
  authMiddleware,
  checkRoleMiddleware("ADMIN"),
  userController.check
);
router.get(
  "/users",
  authMiddleware,
  checkRoleMiddleware("ADMIN"),
  userController.getUsers
);
module.exports = router;
