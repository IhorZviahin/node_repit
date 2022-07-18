const {userService, passwordService, emailService, smsService, S3Service} = require("../services");
const {userPresenter} = require("../presenters/userPresenter");
const {emailActionsTypeEnum, smsActionsTypeEnum} = require("../enums");
const {smsTemplateBuilder} = require("../common");
const {uploadFile, updateFile} = require("../services/s3Service");
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

        const hash = await passwordService.hashPassword(password);
        const newUser = await userService.CreateUser({...req.body, password: hash});
        const {_id} = newUser;
        const {Location} = await uploadFile(req.files.avatar, 'user', _id);
        const updateUserWithPhoto = await Users.findByIdAndUpdate(_id, {avatar: Location}, {new: true})

        //const sms = smsTemplateBuilder[smsActionsTypeEnum.WELCOME]({name})

        // Promise.allSettled(
        //     [
        //         smsService.sendSMS(phone, sms),
        //         emailService.sendMail(email, emailActionsTypeEnum.WELCOME, { name })
        //     ]
        // )

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
        if (req.user.avatar) {
            await S3Service.deleteFile(req.user.avatar);
        }
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}

async function UpdateUserById(req, res, next) {
    try {
        const {id} = req.params;
        if (req.files?.avatar) { //якщо маємо аватара
            if (req.user.avatar) {  // якщо маємо
                const {Location} = await uploadFile(req.files.avatar, 'user', id);
                req.body.avatar = Location;
            } else {
                const {Location} = await S3Service.updateFile(req.files.avatar, req.user.avatar);
                req.body.avatar = Location;
            }
        }
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