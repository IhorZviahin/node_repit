const nodemailer = require('nodemailer');

const {configs} = require("../configs")

module.exports = {

    sendMail: () => {
        const transporter = nodemailer.createTransport({
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD,
            },
            service: "gmail"
        })
        return transporter.sendMail({
            from: "No reply",
            to: "ulazvagin@gmail.com",
            subject: "Pls work",
            html: '<div style="color: aqua"> Pls work!!! </div> '
        })
    }
}