const {userService} = require("../services");
const CustomError = require("../errors/customsError");
const {userValidator, queryValidator} = require("../validators");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;
            console.log(id)
            const user = await userService.getUserById({_id: id});
            if (!user) {
                return next(new CustomError("User not found"));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    validUserForCreate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);
            if(error){
                return next(new CustomError(error.details[0].message, 409));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }

    },
    validUserForUpdate: async (req, res, next) => {
        try {
            console.log(req)
            const {error, value} = userValidator.updateUserValidator.validate(req.body);
            if(error){
                return next(new CustomError(error.details[0].message, 409));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }

    },
    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await userService.UpdateUser({email});
            console.log(user)
            if (user) {
                return next(new CustomError(`User with email ${email} is exist`, 409));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserQueryValid: async (req, res, next) => {
        try {
            const {error, value} = queryValidator.FindAll.validate(req.query);
            if(error){
                return next(new CustomError(error.details[0].message, 409));
            }
            req.query = value;
            next();
        } catch (e) {
            next(e);
        }

    },
    checkIsUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await userService.UpdateUser({email});
            if (!user) {
                return next(new CustomError(`User with email ${email} not found`, 404));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
}