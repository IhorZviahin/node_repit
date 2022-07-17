const userRouter = require('express').Router();

const {userController} = require("../contollers")
const {userMiddlewares, commonMiddlewares, authMiddleware, fileMiddleware} = require("../middlewares");

userRouter.get("/",
    userMiddlewares.isUserQueryValid,
    userController.getFindUsers);
userRouter.post("/",
    userMiddlewares.validUserForCreate,
    fileMiddleware.checkAvatar,
    userMiddlewares.isUserUniq,
    userController.CreatebyUser);

userRouter.get("/:id",
    commonMiddlewares.isIdValid,
    userMiddlewares.isUserPresent,
    userController.FindUserById);
userRouter.put("/:id",
    commonMiddlewares.isIdValid,
    authMiddleware.checkAccessTokens,
    userMiddlewares.validUserForUpdate,
    fileMiddleware.checkAvatar,
    userMiddlewares.isUserPresent,
    userController.UpdateUserById);
userRouter.delete("/:id",
    commonMiddlewares.isIdValid,
    authMiddleware.checkAccessTokens,
    userMiddlewares.isUserPresent,
    userController.DeleteUserbyId);

module.exports = userRouter;