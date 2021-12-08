const Router = require("express");
const router = new Router();
const userController = require("../controllers/user-сontroller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/auth", authMiddleware, userController.check);
module.exports = router;
