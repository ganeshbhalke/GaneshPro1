require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
transporter.verify((err, success) => {
  if (err) {
    console.error("MAIL ERROR:", err);
  } else {
    console.log("✅ Mail Server Connected");
  }
});

module.exports = transporter;