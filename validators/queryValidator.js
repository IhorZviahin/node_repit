const Joi = require("joi");

const {emailValidator, passwordValidator, nameValidator, ageValidator, pageValidator, perPageValidator, searchValidator} = require("./commonValidator");

module.exports = {
    FindAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
        page: pageValidator,
        perPage: perPageValidator,
        search: searchValidator,
        ageGte: ageValidator,
        ageLte: ageValidator,
    }),
}