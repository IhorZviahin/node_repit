const {emailActionsTypeEnum} = require('../enums')

module.exports = {
    [emailActionsTypeEnum.WELCOME]: {
        subject: 'Welсome on board',
        template: 'welcome'
    },

    [emailActionsTypeEnum.FORGOT_PASSWORD]: {
        subject: 'Opps looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActionsTypeEnum.USER_BANNED]: {
        subject: 'Account was blocked',
        template: 'account-blocked'
    },

    [emailActionsTypeEnum.LOGOUT]: {
        subject: 'User was logout',
        template: 'logout'
    },
}