const {userService} = require("../services");

async function getFindUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e) {
        next(e)
    }
}

async function FindUserById(req, res, next) {
    try {
        console.log('aaa')
        const {id} = req.params;
        console.log(id)
        const users = await userService.getUserById(id)
        res.json(users);
    } catch (e) {
        next(e)
    }
}

async function CreatebyUser(req, res, next) {
    try {
        const newUser = await userService.CreateUser(req.body);
        res.status(201).json(newUser);
    } catch (e) {
        next(e)
    }
}

async function DeleteUserbyId(req, res, next) {
    try {
        const { id } = req.params;
        await userService.DeleteUser({ _id: id })

        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}

async function UpdateUserById(req, res, next) {
    try {
        const {id} = req.params;
        const updatedUser = await userService.UpdateUser({_id: id}, req.body);
        res.status(201).json(updatedUser)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    CreatebyUser,
    DeleteUserbyId,
    getFindUsers,
    FindUserById,
    UpdateUserById
}