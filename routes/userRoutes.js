const userRouter = require("express").Router()

const userController = require("../contollers/userController");

userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.CreateUser);
userRouter.get("/:userId", userController.getUserById);
userRouter.put("/:userId", userController.UpdateUser);
userRouter.delete("/:userId", userController.DeleteUser);

module.exports= userRouter;