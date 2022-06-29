const userRouter = require('express').Router();

const {userController} = require("../contollers")
const {userMiddlewares, commonMiddlewares, authMiddleware} = require("../middlewares");

userRouter.get("/", userMiddlewares.isUserQueryValid, userController.getFindUsers);
userRouter.post("/", userMiddlewares.validUserForCreate, userMiddlewares.isUserUniq, userController.CreatebyUser);

userRouter.get("/:id", commonMiddlewares.isIdValid, userMiddlewares.isUserPresent, userController.FindUserById);
userRouter.put("/:id", commonMiddlewares.isIdValid, userMiddlewares.validUserForUpdate,
    userMiddlewares.isUserPresent, userController.UpdateUserById);
userRouter.delete("/:id", commonMiddlewares.isIdValid, authMiddleware.checkAccessToken, userMiddlewares.isUserPresent, userController.DeleteUserbyId);

module.exports = userRouter;