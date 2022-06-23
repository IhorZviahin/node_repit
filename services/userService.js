const {Users} = require("../database")

module.exports = {
    getAllUsers: (params = {}) => {
        return Users.find(params)
    },
    getUserById: (params = {}) => {
        return Users.findById(params)
    },
    UpdateUser: (params, userData, options = { new: true }) => {
        return Users.findOneAndUpdate(params, userData, options);
    },
    CreateUser: (user) => {
        return Users.create(user)
    },
    DeleteUser: (params) => {
        return Users.deleteOne(params);
    }
}