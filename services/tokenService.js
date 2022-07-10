const jwt = require("jsonwebtoken");

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, FORGOT_PASS_ACTION_SECRET} = require("../configs/config")
const {tokenTypeEnum, emailActionsTypeEnum} = require("../enums");
const {configs} = require("../configs");
const CustomError = require("../errors/customsError");

function generateAuthTokens(payload = {}) {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: "30d"});
    return {
        access_token,
        refresh_token
    }
}

// function checkAccessToken(token = "") {
//     try {
//         return jwt.verify(token, ACCESS_TOKEN_SECRET)
//     } catch (e) {
//         throw new CustomsError('Token not valid', 401)
//     }
// }
//
// function checkRefreshToken(token = "") {
//     try {
//         return jwt.verify(token, REFRESH_TOKEN_SECRET)
//     } catch (e) {
//         throw new CustomsError('Token not valid', 401)
//     }
// }

function checkToken(token = '', tokenType = tokenTypeEnum.ACCESS) {
    try {
        let secret;

        if (tokenType === tokenTypeEnum.ACCESS) secret = configs.ACCESS_TOKEN_SECRET;
        if (tokenType === tokenTypeEnum.REFRESH) secret = configs.REFRESH_TOKEN_SECRET;

        return jwt.verify(token, secret);
    } catch (e) {
        throw new CustomError(`Token not valid`, 401);
    }
}

function generateActionToken(actionType, payload = {}) {
    let sectretWord = "";
    let expiresIn = "7d";

    switch (actionType) {
        case emailActionsTypeEnum.FORGOT_PASSWORD:
            sectretWord = FORGOT_PASS_ACTION_SECRET;
            break
        default:
            throw new CustomError("wrong action type", 500);
    }

    return jwt.sign(payload, sectretWord, {expiresIn: expiresIn});

}

function checkActionToken(token = "", actionType) {
    let sectretWord = "";

    switch (actionType) {
        case emailActionsTypeEnum.FORGOT_PASSWORD:
            sectretWord = FORGOT_PASS_ACTION_SECRET;
            break;
        default:
            throw new CustomError("wrong action type", 500);
    }
    return jwt.verify(token, sectretWord)
}

module.exports = {
    checkToken,
    checkActionToken,
    generateActionToken,
    generateAuthTokens,
}