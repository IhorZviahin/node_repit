const {userService, passwordService, emailService, smsService} = require("../services");
const {userPresenter} = require("../presenters/userPresenter");
const {emailActionsTypeEnum, smsActionsTypeEnum} = require("../enums");
const {smsTemplateBuilder} = require("../common");
const {uploadFile} = require("../services/s3Service");
const {Users} = require("../database");

async function getFindUsers(req, res, next) {
    try {
        console.log(req.query)
        const users = await userService.getAllUsers(req.query).exec();
        const UserForResponse = users.map(user => userPresenter(user));
        res.json(UserForResponse);
    } catch (e) {
        next(e)
    }
}

async function FindUserById(req, res, next) {
    try {
        const {id} = req.params;
        const users = await userService.getUserById(id)
        const UserForResponse = userPresenter(users)
        res.json(UserForResponse);
    } catch (e) {
        next(e)
    }
}

async function CreatebyUser(req, res, next) {
    try {
        const {email, password, name, phone} = req.body
        console.log(req.files)
        const avatar = "cw";

        const hash = await passwordService.hashPassword(password);
        const newUser = await userService.CreateUser({...req.body, password: hash});
        const {_id} = newUser;
        const {Location} = await uploadFile(req.files.Avatar, 'user', _id);
        const updateUserWithPhoto = await Users.findByIdAndUpdate(_id, {avatar: Location}, {new: true})

        //const sms = smsTemplateBuilder[smsActionsTypeEnum.WELCOME]({name})
        //await smsService.sendSMS(phone, sms)

        //await emailService.sendMail(email, emailActionsTypeEnum.WELCOME, { name });

        const UserForResponse = userPresenter(updateUserWithPhoto)
        res.status(201).json(UserForResponse);
    } catch (e) {
        next(e)
    }
}

async function DeleteUserbyId(req, res, next) {
    try {
        const {id} = req.params;
        await userService.DeleteUser({_id: id})

        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}

async function UpdateUserById(req, res, next) {
    try {
        const {id} = req.params;
        const updatedUser = await userService.UpdateUser({_id: id}, req.body);
        const UserForResponse = userPresenter(updatedUser)
        res.status(201).json(UserForResponse)
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