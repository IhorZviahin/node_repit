const {emailActionsTypeEnum} = require("../enums");

module.exports = {
    [emailActionsTypeEnum.WELCOME]: {
        subject: "Welcome om board",
        template: "welcome"
    },
    [emailActionsTypeEnum.FORGOT_PASSWORD]: {
        subject: "Forgot password",
        template: "forgot-password"
    },
    [emailActionsTypeEnum.USER_BANNED]: {
        subject: "Account was blocked",
        template: "account-blocked"
    },
}