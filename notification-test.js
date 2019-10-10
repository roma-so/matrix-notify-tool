require('dotenv').config()

const nodemailer = require('nodemailer')

module.exports = (message) => {
  // Set up email for the testing
  const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'You assigned to PR',
    text: message
  };

  mailOptions.text = message
  transporter.sendMail(mailOptions)
}
