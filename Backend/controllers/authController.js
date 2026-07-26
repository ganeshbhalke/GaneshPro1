const otpGenerator = require("otp-generator");
const brevo = require("../config/mailConfig");

// Temporary OTP Store
const otpStore = {};

// ==========================
// Send OTP
// ==========================
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 Minutes
  };

  try {
    console.log("📧 Sending OTP To:", email);

    // ==========================
    // Brevo Send Email
    // ==========================
    const sendSmtpEmail = {
      sender: {
        name: "Electricity Management",
        email: "ganeshbhalke2004@gmail.com",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "Electricity Management OTP",
      htmlContent: `
        <h2>Email Verification</h2>
        <h3>Your OTP is: <b>${otp}</b></h3>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

const data = await brevo.transactionalEmails.sendTransacEmail(sendSmtpEmail);
    console.log("Mail Sent:", data);

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (err) {
    console.error("❌ MAIL ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to Send OTP",
      error: err.message,
    });
  }
};

// ==========================
// Verify OTP
// ==========================
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({
      success: false,
      message: "OTP not found. Please request a new OTP.",
    });
  }

  if (Date.now() > storedOtp.expiresAt) {
    delete otpStore[email];

    return res.status(400).json({
      success: false,
      message: "OTP has expired",
    });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  delete otpStore[email];

  return res.status(200).json({
    success: true,
    message: "OTP Verified Successfully",
  });
};