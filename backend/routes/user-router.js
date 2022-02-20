const Router = require("express");
const { ADMIN } = require("../constants/roles");
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
  checkRoleMiddleware(ADMIN.name),
  userController.check
);
router.get(
  "/users",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  userController.getUsers
);
router.put(
  "/user",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  userController.edit
);
router.post(
  "/user",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  userController.create
);
module.exports = router;
