"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require('dotenv').config();

const sendEmail = async (recipient, html) => {
  const transporter = _nodemailer.default.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
      user: process.env.mailuser,
      pass: process.env.mailpass
    }
  });

  const message = {
    from: process.env.admin,
    to: recipient,
    subject: 'Issue Tracker',
    html
  };
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(`Error occurred. ${err.message}`);
    }
  });
};

exports.sendEmail = sendEmail;