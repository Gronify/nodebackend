const Router = require("express");
const { ADMIN } = require("../constants/roles");
const applicationСontroller = require("../controllers/application-сontroller");
const authMiddleware = require("../middlewares/auth-middleware");
const checkRoleMiddleware = require("../middlewares/checkRole-middleware");
const router = new Router();

router.post("/", applicationСontroller.create);
router.put(
  "/",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  applicationСontroller.edit
);
router.get(
  "/all",
  authMiddleware,
  checkRoleMiddleware(ADMIN.name),
  applicationСontroller.getAll
);

module.exports = router;
