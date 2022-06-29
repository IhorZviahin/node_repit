const CustomError = require("../errors/customsError");
const {checkAccessToken} = require('../services/tokenService')

module.exports = {
    checkAccessToken: (req, res, next) => {
        try {
            const authToken = req.get('Authorization');
            if(!authToken){
                throw new CustomError("No token", 401)
            }
            checkAccessToken(authToken);

            next()
        } catch (e) {
            next(e)
        }
    }
}