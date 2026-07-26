// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// module.exports = transporter;

// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// module.exports = resend;


// require("dotenv").config();

// const brevo = require("@getbrevo/brevo");

// const apiInstance = new brevo.TransactionalEmailsApi();

// apiInstance.setApiKey(
//   brevo.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );

// module.exports = apiInstance;



require("dotenv").config();

const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

module.exports = brevo;