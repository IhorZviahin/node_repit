const dayjs = require('dayjs')

const OAuth = require("../database/OauthTokens");

module.exports = async () => {
    console.log("Start DELETE OLD OAUTH TOKENS", new Date().toISOString())
    const monthBeforeNow = dayjs().subtract(1, 'month')

    await OAuth.deleteMany({
        createdAt: {$lte: monthBeforeNow}
    })
    console.log("Finish DELETE OLD OAUTH TOKENS", new Date().toISOString())
}