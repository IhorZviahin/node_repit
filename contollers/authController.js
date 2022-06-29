const {generateAuthTokens} = require("../services/tokenService");
const passwordService = require("../services/passwordService");


module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword} = req.user;
            const {password} = req.body;
            await passwordService.comparePassword(hashPassword, password)
            const tokens = generateAuthTokens();
            res.json({
                user:req.user,
                ...tokens
            })
        } catch (e) {
            next(e)
        }
    }
}