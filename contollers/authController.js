const {generateAuthTokens} = require("../services/tokenService");
const passwordService = require("../services/passwordService");
const OAuth = require("../database/OauthTokens");


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
                user:req.user,
                ...tokens
            })
        } catch (e) {
            next(e)
        }
    }
}