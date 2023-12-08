const {
  errorMessage,
  successData,
  findOneData,
  getAllData,
  postData,
  updateData,
} = require('../../helpers/cred');
const Login = require('../../models/login');
const Permission = require('../../models/permission');
const Designation = require('../../models/designation');
const { stripe } = require('../../config');
const Stripe = require('stripe')(stripe.secret_key);
const SignUp = require('../../models/signup');
const { eachPermission } = require('../../helpers/eachPermission');
const { jwts, AES } = require('../../config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { docusign } = require('../../config');
const Transaction = require('../../models/transaction');
const Docusign = require('docusign-esign');
const CryptoJS = require('crypto-js');
let SignUppresent;
let SignUpdata;
// login function
exports.login = async (req, res, next) => {
  let { socket } = req.app.locals;
  try {
    const { email, password } = req.body;

    let user = await findOneData(Login, { email });
    console.log('user', user);
    // no user
    if (!user) return errorMessage(res, 'Invalid username or password', 200);
    // invalid password
    if (!(await Login.verifyPassword(password, user.password, user.salt)))
      return errorMessage(res, 'Invalid username or password', 200);

    const accessTocken = Login.generateAuthToken(user);
    console.log('accessTocken', accessTocken);
    const refreshTocken = Login.generateAuthToken(user);
    let permission;

    console.log('first');
    let { designation } = await Designation.findByPk(user.designationId);
    if (designation === 'Admin') {
      let allPermission = await Permission.findAll();
      //   console.log(JSON.stringify(allPermission, null, 2));

      //   get all the permision in array format
      const result = {};
      for (const { menu, subMenu } of allPermission) {
        if (!result[menu]) {
          result[menu] = [];
        }
        result[menu].push(subMenu);
      }
      permission = Object.entries(result).map(([menu, subMenus]) => ({
        [menu]: subMenus,
      }));
      //   console.log(output);
    } else {
      permission = await eachPermission(user.designationId);
    }

    return await successData(res, {
      accessTocken,
      role: designation,
      permission,
    });
  } catch (error) {
    errorMessage(res, error.message);
  }
};

// get progile API
exports.getProfile = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    const decoded = await jwt.verify(token, jwts.JWT_SECRET);

    let user = await Login.findByPk(decoded.id);
    let data = await eachPermission(user.designationId);
    let role = await Designation.findByPk(user.designationId);
    let profile = await SignUp.findOne({ where: { loginId: decoded.id } });

    let permission;
    if (role.designation === 'Admin') {
      let allPermission = await Permission.findAll();
      const result = {};
      for (const { menu, subMenu } of allPermission) {
        if (!result[menu]) {
          result[menu] = [];
        }
        result[menu].push(subMenu);
      }
      permission = Object.entries(result).map(([menu, subMenus]) => ({
        [menu]: subMenus,
      }));
      data = permission;
    }
    successData(res, {
      success: true,
      data: { permission: data, role: role.designation, profile },
    });
  } catch (error) {
    errorMessage(res, error.message);
  }
};

exports.Signup = async (req, res, next) => {
  let LoginDatas;
  try {
    console.log('req.body', req.body);
    const DesignationData = await Designation.findAll({
      where: {
        designation: req.body.designation,
      },
    });
    function generatePassword(length) {
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    }
    const password = generatePassword(12);
    console.log('password', password);
    const salt = await Login.generateSalt();
    req.body.password = await Login.hashPassword(password, salt);
    req.body.salt = salt;
    const LoginDetails = {
      email: req.body.email,
      password: req.body.password,
      salt: req.body.salt,
      designationId: DesignationData[0].id,
    };
    const LoginDataPresent = await Login.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (LoginDataPresent.length === 0) {
      LoginDatas = await Login.create(LoginDetails);
    } else {
      errorMessage(res, 'Login With this email already present');
    }
    const SignupDetails = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      PhoneNo: req.body.PhoneNo,
      loginId: LoginDatas.id,
    };
    // if (SignUppresent) {
    const customer = await Stripe.customers.create({
      name: req.body.FirstName,
      email: req.body.email,
      phone: req.body.PhoneNo,
      payment_method: req.params.id,
      invoice_settings: {
        default_payment_method: req.params.id,
      },
    });
    // console.log('customer', customer);
    // }

    // if (SignUppresent.length === 0) {
    SignUpdata = await SignUp.create(SignupDetails);

    // } else {
    //   console.log('Data Already Present');
    // }
    // console.log('SignUpdata', SignUpdata);
    let url = await documentSign(req);
    // console.log('SignUppresent', SignUppresent);
    let SignUpLook = await this.SignUpCheck();
    res.json({
      success: true,
      message: url,
    });
    // {
    //   SignUppresent
    //     ? res.json({
    //         success: true,
    //         message: SignUppresent,
    //       })
    //     : null;
    // }
  } catch (e) {
    // errorMessage(res, e.message);
  }
};

async function checkToken(req) {
  console.log('2:   TOKEN CREATION');

  try {
    if (req.session.access_token && Date.now() < req.session.expires_at) {
      console.log('RE USING ACCESS TOKEN', req.session.access_token);
    } else {
      console.log('GENERATING NEW ACCESS TOKEN');
      let dsApiClient = new Docusign.ApiClient();

      dsApiClient.setBasePath(docusign.basePath);

      const results = await dsApiClient.requestJWTUserToken(
        docusign.integrationKey,
        docusign.userId,
        'signature',
        fs.readFileSync(path.join(__dirname, '../../private.key')),
        3600
      );
      // console.log('results', results);
      req.session.access_token = results.body.access_token;
      req.session.expires_at =
        Date.now() + (results.body.expires_in - 60) * 1000;

      req.session.save(function (err) {
        if (err) console.log('error docusign', err);
        else console.log('############# SESSION SAVED ##################');
      });
    }
    // req.redirect('')
  } catch (error) {
    console.log('error docusign catch', error.message);
  }
}
async function documentSign(req) {
  console.log('1:   INSIDE FUNCTION');
  // let { customer } = req.body;

  await checkToken(req);

  let envelopesApi = getEnvelopesApi(req);
  let envelope = makeEnvelope(req);
  // console.log('docusign.accountId', docusign.accountId);
  let result = await envelopesApi.createEnvelope(docusign.accountId, {
    envelopeDefinition: envelope,
  });
  // console.log('ENVELOPE RESULT', result);
  // console.log(result);

  // let viewRequest = makeRecipientViewRequest(
  //   req.body.FirstName,
  //   req.body.email
  // );
  // const { url } = await envelopesApi.createRecipientView(
  //   docusign.accountId,
  //   result.envelopeId,
  //   { recipientViewRequest: viewRequest }
  // );
  // console.log(url);
  // return { result, url };

  let viewRequest = makeRecipientViewRequest(
    req.body.FirstName,
    req.body.email
  );
  // console.log('result.envelopeId', result.envelopeId);
  result = await envelopesApi.createRecipientView(
    docusign.accountId,
    result.envelopeId,
    { recipientViewRequest: viewRequest }
  );
  return result.url;
  // response.redirect(result.url);
}

function getEnvelopesApi(req) {
  console.log('3:   ENVELOPE API');

  let dsApiClient = new Docusign.ApiClient();
  dsApiClient.setBasePath(docusign.basePath);
  dsApiClient.addDefaultHeader(
    'Authorization',
    'Bearer ' + req.session.access_token
  );
  return new Docusign.EnvelopesApi(dsApiClient);
}

function makeEnvelope(req) {
  console.log('4:   MAKE ENVELOPE');

  // let { customer } = req.body;

  let env = new Docusign.EnvelopeDefinition();
  env.templateId = docusign.templateId;
  let text = Docusign.Text.constructFromObject({
    tabLabel: 'Signer Name',
    value: req.body.FirstName,
  });

  // pull together the existing and new tabs ina a tab object
  let tabs = Docusign.Tabs.constructFromObject({
    textTabs: [text],
  });

  let signer1 = Docusign.TemplateRole.constructFromObject({
    email: req.body.email,
    name: req.body.FirstName,
    tabs: tabs,
    clientUserId: docusign.clientUserId,
    roleName: 'Signer',
  });
  // console.log('signer1', signer1);
  // let cc;
  // if (req.cc_email) {
  //   cc = new Docusign.TemplateRole();
  //   cc.email = 'midhun@spericorn.com';
  //   cc.name = 'Maadu';
  //   cc.roleName = 'cc';
  // }
  // env.templateRoles = [signer1, cc];

  env.templateRoles = [signer1];
  env.status = 'sent';

  return env;
}

function makeRecipientViewRequest(name, email) {
  console.log('5:   VIEW REQUEST');
  let viewRequest = new Docusign.RecipientViewRequest();
  console.log('viewRequest', viewRequest);

  viewRequest.returnUrl = 'http://localhost:5173/payment_details';
  viewRequest.authenticationMethod = 'none';

  // Recipient info must match embedded recipient info we use to create the envelope
  viewRequest.email = email;
  viewRequest.userName = name;
  viewRequest.clientUserId = docusign.clientUserId;

  return viewRequest;
}

exports.SignUpCheck = async (res, result) => {
  // console.log('result', res, result);
  {
    result
      ? ((SignUppresent = await SignUp.findAll({
          where: {
            loginId: result,
          },
        })),
        console.log('SignUppresentdfgdfgg', SignUppresent))
      : null;
  }
};

// stripe
exports.makePayment = async (req, res) => {
  try {
    let paymentData = req.body;
    console.log('paymentData', paymentData);

    let id = SignUpdata.id;
    let { url, intent } = await this.makeStripePayment(paymentData, id);
    let transactionData = await Transaction.create({
      amount: '2000',
      type: 'card',
      date: JSON.stringify(new Date()),
      loginId: id,
      stripeId: intent,
    });
    successData(res, url);
  } catch (error) {
    errorMessage(res, error.message);
  }
};

exports.makeStripePayment = async (card, id) => {
  try {
    let cardDetails = card;
    console.log('cardDetails', cardDetails);

    const [month, year] = cardDetails.expiryDate.split('/');
    console.log('cardDetails', month, year);

    const paymentMethod = await Stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardDetails.cardNumber.replace(/\s/g, ''),
        exp_month: parseInt(month),
        exp_year: parseInt(year),
        cvc: cardDetails.cvc,
      },
    });

    const intent = await Stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: 2000 * 100,
      currency: 'inr',
      confirm: true,
      payment_method_types: ['card'],
    });

    const paymantIntent = await Stripe.paymentIntents.confirm(intent.id, {
      payment_method: paymentMethod.id,
    });

    // console.log(intent);
    // console.log(
    //   '@@@@@@@@@@@@@@@@@@@@',
    //   paymantIntent.next_action.use_stripe_sdk.stripe_js
    // );
    return {
      url: paymantIntent.next_action.use_stripe_sdk.stripe_js,
      intent: intent.id,
    };
  } catch (error) {
    console.log(error);
  }
};
