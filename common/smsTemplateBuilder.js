const {smsActionsTypeEnum} = require("../enums");

module.exports = {
    [smsActionsTypeEnum.WELCOME]: ({name}) => {
        return `Welcome ${name}!`
    }
}