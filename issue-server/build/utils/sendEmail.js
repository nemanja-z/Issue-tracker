"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

const sendEmail = async (recipient, html) => {
  _nodemailer.default.createTestAccount((err1, account) => {
    if (err1) {
      console.log(err1);
    }

    const transporter = _nodemailer.default.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'walton20@ethereal.email',
        pass: 'hVddjhFq8vQ7F6pSRJ'
      }
    });

    const message = {
      from: "Sender Name <sender@example.com>",
      to: `Recipient <${recipient}>`,
      subject: "Password reset",
      text: "Issue Tracker",
      html
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
      }

      console.log("Message sent: %s", info.messageId); // Preview only available when sending through an Ethereal account

      console.log("Preview URL: %s", _nodemailer.default.getTestMessageUrl(info));
    });
  });
};

exports.sendEmail = sendEmail;