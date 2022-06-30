const bcrypt = require('bcrypt');
const CustomError = require("../errors/customsError");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);
        console.log(isPasswordsSame)
        if (!isPasswordsSame) {
            throw new CustomError('Wrong email or password', 400)
        }
    }
}