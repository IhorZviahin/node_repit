const userRouter = require('express').Router();

const {userController} = require("../contollers")
const {userMiddlewares, commonMiddlewares} = require("../middlewares");

userRouter.get("/", userController.getFindUsers);
userRouter.post("/", userMiddlewares.validUserForCreate, userMiddlewares.isUserUniq, userController.CreatebyUser);

userRouter.get("/:id", commonMiddlewares.isIdValid, userMiddlewares.isUserPresent, userController.FindUserById);
userRouter.put("/:id", commonMiddlewares.isIdValid, userMiddlewares.validUserForUpdate,
    userMiddlewares.isUserPresent, userController.UpdateUserById);
userRouter.delete("/:id", commonMiddlewares.isIdValid, userMiddlewares.isUserPresent, userController.DeleteUserbyId);
///isIdValid
module.exports = userRouter;