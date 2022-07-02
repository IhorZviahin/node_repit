const authRoutes = require('express').Router();

const {authController} = require("../contollers")
const {userMiddlewares, authMiddleware} = require("../middlewares")

authRoutes.post("/login",
    authMiddleware.isLoginBodyValidator,
    userMiddlewares.checkIsUserPresent,
    authController.login);
authRoutes.post("/refreshToken", authMiddleware.checkRefreshTokens, authController.refreshToken);

authRoutes.post("/logout", authMiddleware.checkAccessTokens, authController.logout);
authRoutes.post("/logoutAll", authMiddleware.checkAccessTokens, authController.logoutAllDevices);


module.exports = authRoutes;