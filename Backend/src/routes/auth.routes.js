const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

// /api/auth/register
authRouter.post("/register", authController.registerContoller);

// /api/auth/login
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
