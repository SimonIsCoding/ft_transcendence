const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: config.EMAIL_SERVICE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD
  }
});

module.exports = {
  send2FAToken: async (email, token) => {
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: email,
      subject: `Your ${config.APP_NAME} Verification Code`,
      text: `Your verification code is: ${token}\nThis code will expire in 5 minutes.`,
      html: `<p>Your verification code is: <strong>${token}</strong></p><p>This code will expire in 5 minutes.</p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
};