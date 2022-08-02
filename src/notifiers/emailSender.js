const nodemailer = require("nodemailer")
require('dotenv').config()

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL, URL_EMAIL_SENDER_LOCAL, URL_EMAIL_SENDER_DEPLOY } = process.env

// reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});


const notifierEmail = async ({ sendTo, situation, type, data }) => {

  await transporter.sendMail({
    from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
    to: sendTo,
    subject: "Change laboral situation",
    html: `<div>El ${type} : ${data.name} ha sido dado de ${situation} del club: ${data.club}</div>`
  });
}


module.exports = {
  notifierEmail
}
