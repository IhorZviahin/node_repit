const Joi = require("joi");

const {emailValidator, passwordValidator, nameValidator, ageValidator} = require("./commonValidator");

module.exports = {
    FindAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
    }),
}