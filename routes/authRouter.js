const authRoutes = require('express').Router();

const {authController} = require("../contollers")
const {userMiddlewares, authMiddleware} = require("../middlewares")
const {emailActionsTypeEnum} = require("../enums")

authRoutes.post("/login",
    authMiddleware.isLoginBodyValidator,
    userMiddlewares.checkIsUserPresent,
    authController.login);

authRoutes.post("/password/forgot",
    userMiddlewares.checkIsUserPresent,
    authController.forgotPassword);

authRoutes.post("/password/forgot/set",
    authMiddleware.checkActionToken(emailActionsTypeEnum.FORGOT_PASSWORD),
    authController.setForgotPassword);

authRoutes.post("/refreshToken",
    authMiddleware.checkRefreshTokens,
    authController.refreshToken);

authRoutes.post("/logout",
    authMiddleware.checkAccessTokens,
    authController.logout);
authRoutes.post("/logoutAll",
    authMiddleware.checkAccessTokens,
    authController.logoutAllDevices);


module.exports = authRoutes;