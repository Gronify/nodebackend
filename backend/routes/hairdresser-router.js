const Router = require("express");
const { ADMIN } = require("../constants/roles");
const hairdresserСontroller = require("../controllers/hairdresser-сontroller");

const authMiddleware = require("../middlewares/auth-middleware");
const checkRoleMiddleware = require("../middlewares/checkRole-middleware");
const router = new Router();

router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  hairdresserСontroller.create
);
router.put(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  hairdresserСontroller.edit
);
router.get(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  hairdresserСontroller.getAll
);
router.post(
  "/create",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  hairdresserСontroller.createWithUser
);

module.exports = router;
