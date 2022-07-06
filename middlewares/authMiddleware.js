const CustomError = require("../errors/customsError");
const {checkToken} = require('../services/tokenService')
const OAuth = require('../database/OauthTokens')
const {authValidator} = require("../validators");
const {constants} = require("../configs");
const {tokenTypeEnum} = require("../enums");

module.exports = {
    checkAccessTokens: async (req, res, next) => {
        try {
            const access_token = req.get(constants.Authorization);

            if (!access_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(access_token);

            const tokenInfo = await OAuth.findOne({ access_token }).populate('userId');

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshTokens: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.Authorization);

            if (!refresh_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({ refresh_token });

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
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