const Login = require('../../models/login');
const SignUp = require('../../models/signup');
const { SignUpCheck } = require('../auth_management/controller');

exports.success = async (req, res) => {
  console.log('1', req.body.data.envelopeSummary.recipients);

  try {
    let checkEmailExists = await Login.findAll({
      where: {
        email: req.body.data.envelopeSummary.recipients.signers[0].email,
      },
    });
    console.log('checkEmailExists', checkEmailExists[0].id);
    let result = await SignUp.update(
      { signed: 'Signed' },
      {
        where: {
          loginId: checkEmailExists[0].id,  
        },
      }
    );
    // res.json(result);
    SignUpCheck(res, checkEmailExists[0].id);
  } catch (error) {
    console.log(error);
  }
};
