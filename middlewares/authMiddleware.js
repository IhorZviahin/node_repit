const CustomError = require("../errors/customsError");
const {checkAccessToken, checkRefreshToken} = require('../services/tokenService')
const Oauth = require('../database/OauthTokens')
const {authValidator} = require("../validators");
const {constants} = require("../configs");

module.exports = {
    checkAccessTokens: async (req, res, next) => {
        try {
            const authToken = req.get(constants.Authorization);
            if (!authToken) {
                throw new CustomError("No token", 401)
            }
            checkAccessToken(authToken);

            const tokenInfo = await Oauth.findOne({access_token: authToken}).populate('userId');
            if (!tokenInfo) {
                throw new CustomError("Token not valid", 401);
            }

            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;

            next()
        } catch (e) {
            next(e)
        }
    },
    checkRefreshTokens: async (req, res, next) => {
        try {
            const refreshToken = req.get(constants.Authorization);
            if (!refreshToken) {
                throw new CustomError("No token", 401)
            }
            checkRefreshToken(refreshToken);

            const tokenInfo = await Oauth.findOne({refresh_token: refreshToken});
            console.log(tokenInfo)
            if (!tokenInfo) {
                throw new CustomError("Token not valid", 401);
            }

            req.tokenInfo = tokenInfo;

            next()
        } catch (e) {
            next(e)
        }
    },
    isLoginBodyValidator: async (req, res, next) =>{
        try {
            const {error, value} = await authValidator.login.validate(req.body);
            if (error) {
                return next(new CustomError("Wrong email or password"));
            }
            req.body = value;
            next();
        }catch (e){
            next(e)
        }
    }
}