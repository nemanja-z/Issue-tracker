import nodemailer from 'nodemailer';
require('dotenv').config();


export const sendEmail = async (recipient, html) => {
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      auth: {
        user: process.env.mailuser,
        pass: process.env.mailpass,
      },
    });
    const message = {
      from: process.env.admin,
      to: recipient,
      subject: 'Issue Tracker',
      html,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
      }
    });
  };
