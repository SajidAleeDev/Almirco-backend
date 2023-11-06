const express = require("express");
const {
  registerController,
  loginController,
  userController,
  refreshController,
  productController,
} = require("../controllers/index.js");
const auth = require("../middlewares/auth.js");
const admin = require("../middlewares/admin.js");

const router = express();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

router.post("/products", productController.store);
router.get("/products", productController.index);

module.exports = router;
