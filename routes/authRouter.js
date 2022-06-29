const authRoutes = require('express').Router();

const {authController} = require("../contollers")
const userMiddlewares = require("../middlewares/userMiddlewares")

authRoutes.post("/login", userMiddlewares.checkIsUserPresent, authController.login);


module.exports = authRoutes;