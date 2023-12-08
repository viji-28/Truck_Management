const contact = require('../../models/contact');
const { successMessage, errorMessage } = require('../../helpers/cred');
const { sendMail } = require('../../modules/mailer');

exports.postContact = async (req, res) => {
  try {
    const contactDetails = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      status: 'unread',
    };
    await contact.create(contactDetails);
    await sendMail(
      {
        to: req.body.email,
        content: req.body.message,
        email: req.body.email,
      },
      res
    );
  } catch (e) {
    return await errorMessage(res, e);
  }
};
