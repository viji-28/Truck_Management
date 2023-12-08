const {
  errorMessage,
  successData,
  findOneData,
} = require('../../helpers/cred');
const Docusign = require('docusign-esign');
const driver = require('../../models/driver');
const jwt = require('jsonwebtoken');
const { jwts } = require('../../config');
const Login = require('../../models/login');
const { docusign } = require('../../config');
const TruckModel = require('../../models/truckDatabase');
const RouteModel = require('../../models/route');

const path = require('path');

const fs = require('fs');
let decodedemail;
exports.driverSignup = async (req, res) => {
  try {
    console.log('req.body', req.files);
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    // console.log('decoded', jwts.secret_key);
    const decoded = jwt.verify(token, jwts.JWT_SECRET);
    console.log('decoded', decoded);
    decodedemail = decoded.email;
    const loginData = await Login.findAll({ where: { email: decodedemail } });
    console.log('loginData', loginData[0].id);
    req.body.loginId = loginData[0].id;
    req.body.dailyWage = '1500';
    req.body.bata = '500';
    // DOCUSIGN
    let url = await documentSign(req, req.body.loginId);
    const data = driver.create(req.body);
    // console.log('docu');
    res.json({ success: true, data: url });
  } catch (error) {
    errorMessage(res, error.message);
  }
};
//MAIN FUNCTION
async function documentSign(req, loginId) {
  try {
    console.log('first');
    // let { email, name } = req.body;

    await checkToken(req);

    let envelopesApi = getEnvelopesApi(req);
    let envelope = makeEnvelope('Admin', 'Midhun@spericorn.com');

    let result = await envelopesApi.createEnvelope(docusign.accountId, {
      envelopeDefinition: envelope,
    });

    let viewRequest = makeRecipientViewRequest(
      'Admin',
      'Midhun@spericorn.com',
      loginId
    );
    result = await envelopesApi.createRecipientView(
      docusign.accountId,
      result.envelopeId,
      { recipientViewRequest: viewRequest }
    );
    console.log('URL SENDED ');
    return result.url;
  } catch (error) {
    console.log(error);
    // errorMessage(res, error.message);
  }
}

// TOKEN GENERATION
async function checkToken(req) {
  try {
    if (req.session.access_token && Date.now() < req.session.expires_at) {
      console.log('RE USING ACCESS TOKEN', req.session.access_token);
    } else {
      //   console.log('GENERATING NEW ACCESS TOKEN');

      let dsApiClient = new Docusign.ApiClient();
      dsApiClient.setBasePath(docusign.basePath);
      const results = await dsApiClient.requestJWTUserToken(
        docusign.integrationKey,
        docusign.userId,
        'signature',
        fs.readFileSync(path.join(__dirname, '../../private.key')),
        3600
      );
      req.session.access_token = results.body.access_token;
      req.session.expires_at =
        Date.now() + (results.body.expires_in - 60) * 1000;

      req.session.save(function (err) {
        if (err) console.log(err);
      });
    }
  } catch (error) {
    console.log(error);
    // errorMessage();
  }
}

// GENERATE ENVELOPE API
function getEnvelopesApi(req) {
  let dsApiClient = new Docusign.ApiClient();
  dsApiClient.setBasePath(docusign.basePath);
  dsApiClient.addDefaultHeader(
    'Authorization',
    'Bearer ' + req.session.access_token
  );
  return new Docusign.EnvelopesApi(dsApiClient);
}

// CREATE THE ENVELOPE
function makeEnvelope(name, email) {
  try {
    let env = new Docusign.EnvelopeDefinition();
    env.templateId = docusign.templateId;
    let text = Docusign.Text.constructFromObject({
      tabLabel: 'Signer Name',
      value: name,
    });

    // pull together the existing and new tabs in a tab object
    let tabs = Docusign.Tabs.constructFromObject({
      textTabs: [text],
    });

    let signer1 = Docusign.TemplateRole.constructFromObject({
      email: email,
      name: name,
      tabs: tabs,
      clientUserId: docusign.clientUserId,
      roleName: 'Signer',
    });

    env.templateRoles = [signer1];
    env.status = 'sent';

    return env;
  } catch (error) {
    console.log(error);
  }
}

// BROWSER VIEW
function makeRecipientViewRequest(name, email, loginId) {
  console.log(loginId, '$$$$$$$$$$$$$$$$$$444');
  let viewRequest = new Docusign.RecipientViewRequest();

  viewRequest.returnUrl = `http://localhost:5173/dashboard`;
  viewRequest.authenticationMethod = 'none';

  // Recipient info must match embedded recipient info we use to create the envelope
  viewRequest.email = email;
  viewRequest.userName = name;
  viewRequest.clientUserId = docusign.clientUserId;

  return viewRequest;
}

exports.getAlldriver = async (req, res) => {
  try {
    console.log('first');
    let data = await driver.findAll({});
    console.log('data', data);
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    return await errorMessage(res, e);
  }
};
exports.GetTrucksDriver = async (req, res) => {
  try {
    const data = await TruckModel.findAll();
    successData(res, data);
  } catch (e) {
    errorMessage(res, e.message);
  }
};

exports.GetRouteDriver = async (req, res) => {
  try {
    const data = await RouteModel.findAll();
    successData(res, data);
  } catch (e) {
    errorMessage(res, e.message);
  }
};
