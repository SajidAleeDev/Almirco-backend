import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
  productController,
  dashboardController,
} from "../controllers/index.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express();
// auth routes
router.post("/register", registerController.register); //admin
router.post("/login", loginController.login);
router.post("/refresh", refreshController.refresh); //admin and user
router.post("/logout", auth, loginController.logout);
router.get("/me", userController.me);

// dashboard routes
router.get("/dashboard", dashboardController.index);
router.post("/orders", dashboardController.order); //admin
router.post("/customers", dashboardController.customer); //admin

// user routes
router.post("/ignore_user", userController.ignore_user); //admin
router.get("/users", userController.index); //admin and user req
// router.delete("/users/:id", userController.destroy); //admin
// router.put("/users/:id", userController.update); //admin

// product routes
router.get("/products", productController.index);
router.post("/products", productController.store); //admin
router.put("/products/:id", productController.update); //admin
router["m-search"]("/products", productController.search); //admin and user req
// router.get("/products/:id", productController.show);
// router.delete("/products/:id", productController.destroy);

// Package routes

// router.get("/packages", packageController.index);
// router.post("/packages", packageController.store); //admin
// router.get("/packages/:id", packageController.show);
// router.delete("/packages/:id", packageController.destroy);
// router.put("/packages/:id", packageController.update); //admin

export default router;
