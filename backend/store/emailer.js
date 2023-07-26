"use strict";
const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});



exports.sendEmail = async (to, subject, html) => {

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  
  console.log("Message sent: %s", info.messageId);
}