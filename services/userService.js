const {Users} = require("../database")
const {query} = require("express");
const {userService} = require("./index");
const {userPresenter} = require("../presenters/userPresenter");

module.exports = {
    // getAllUsers: (params = {}) => {
    //     return Users.find(params)
    // },
    // getAllUsersCount:(params = {}) => {
    //     return Users.countDocuments(params)
    // }, для двух вариантов

    getUsersWithPagination: async (query = {}) => {

        const {page = 1, perPage = 5, ...otherFilters} = query;
        console.log(otherFilters)
        const skip = (page - 1) * perPage // расчет сколько мы елемнтов пропускам что бы показать следущюю порцию

        const searchObject = {}

        if (otherFilters.search) {
            Object.assign(searchObject, {
                $or: [
                    {name: {$regex: otherFilters.search, $options: 'i'}},
                    {email: {$regex: otherFilters.search, $options: 'i'}}
                ]
            })
        }

        if (otherFilters.ageGte){
            Object.assign(searchObject, {
               age: {$gte: +otherFilters.ageGte}
            })
        }
        if (otherFilters.ageLte){
            Object.assign(searchObject, {
                age: {...otherFilters.age || {}, $lte: +otherFilters.ageLte }
            })
        }

        const users = await Users.find(searchObject).skip(skip).limit(perPage);
        const usersCount = await Users.countDocuments(searchObject);

        const UserForResponse = users.map(user => userPresenter(user));

        return {
            page,
            perPage,
            Data: UserForResponse,
            count: usersCount,
        }

    },

    getUserById: (params = {}) => {
        return Users.findById(params)
    },
    UpdateUser: (params, userData, options = {new: true}) => {
        return Users.findOneAndUpdate(params, userData, options);
    },
    CreateUser: (user) => {
        return Users.create(user)
    },
    DeleteUser: (params) => {
        return Users.deleteOne(params);
    }
}