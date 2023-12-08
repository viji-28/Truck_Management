const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const { mail } = require('../config');

exports.sendMail = async (filter, res) => {
  const { to, content, subject, cc, bcc } = filter;
  // await emailExistence.check(to, async (error, response) => {
  //   if (response) {
  try {
    const transporter = nodemailer.createTransport({
      service: mail.service,
      auth: {
        user: mail.email,
        pass: mail.pass,
      },
    });

    let send = await transporter.sendMail({
      from: mail.email,
      to: to,
      cc: 'midhun@spericorn.com',
      bcc: bcc,
      subject: subject,
      text: content,
    });
    return true;
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
  // }
  // else {
  //   console.log('Email doesnot exist');
  //   res.json({
  //     success: false,
  //     message: 'Email doesnot exist',
  //   });
  // }
  // });
};
