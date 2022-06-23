const {userService} = require("../services");
const CustomError = require("../errors/customsError");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;
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
            const {age, name, password, email} = req.body;

            if (!age || age < 0) {
                return next(new CustomError("Set valid age"))
            }
            if (!name || name.length < 2) {
                return next(new CustomError("Set valid name"))
            }
            if (!email || !email.includes("@")) {
                return next(new CustomError("Set valid email"))
            }
            if (!password || password.length < 5) {
                return next(new CustomError("Set valid password"))
            }
            next();
        } catch (e) {
            next(e);
        }

    },
    validUserForUpdate: async (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (age && age < 0) {
                return res.status(400).json("Set valid age");
            }
            if (name && name.length < 3) {
                return res.status(400).json("Set valid name");
            }
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
}