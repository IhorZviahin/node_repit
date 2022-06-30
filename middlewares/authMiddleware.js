const CustomError = require("../errors/customsError");
const {checkAccessToken} = require('../services/tokenService')
const Oauth = require('../database/OauthTokens')

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                throw new CustomError("No token", 401)
            }
            checkAccessToken(authToken);

            const tokenInfo = await Oauth.findOne({access_token: authToken}).populate('userId');
            if (!tokenInfo) {
                throw new CustomError("Token not valid", 401);
            }

            req.user = tokenInfo.userId;

            next()
        } catch (e) {
            next(e)
        }
    }
}