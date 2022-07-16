const {generateAuthTokens, generateActionToken} = require("../services/tokenService");
const passwordService = require("../services/passwordService");
const OAuth = require("../database/OauthTokens");
const actionTokens = require("../database/actionTokens");
const users = require("../database/users");
const {emailService} = require("../services");
const {emailActionsTypeEnum} = require("../enums")

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({
                user: req.user,
                ...tokens
            })
        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, name, email} = req.user;
            console.log(req.user)
            console.log(_id)

            const token = generateActionToken(emailActionsTypeEnum.FORGOT_PASSWORD, {name, _id});

            await actionTokens.create({
                userId: _id,
                token,
                actionType: emailActionsTypeEnum.FORGOT_PASSWORD,
            })

            //await emailService.sendMail(email, emailActionsTypeEnum.FORGOT_PASSWORD, {name, token});

            res.json("ok")
        } catch (e) {
            next(e)
        }
    },
    setForgotPassword: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { password } = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const updatedUser = await users.findByIdAndUpdate(_id,{ password: hashPassword }, {new: true});

            await actionTokens.deleteOne({actionType: emailActionsTypeEnum.FORGOT_PASSWORD, userId: _id});
            res.json(updatedUser)
        } catch (e) {
            next(e)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId,
                ...tokens
            });

            res.json(tokens)
        } catch (e) {
            next(e)
        }
    },
    logout: async (req, res, next) => {
        try {
            const {access_token} = req;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await OAuth.deleteMany({userId: _id});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
};