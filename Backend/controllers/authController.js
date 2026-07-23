const transporter = require("../config/mailConfig");
const otpGenerator = require("otp-generator");
const otpStore = require("../utils/otpStore");

// Send OTP

exports.sendOtp = async (req, res) => {
console.log("sendOtp route hit", req.body);
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

    otpStore[email] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000
    };

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Electricity Management OTP",
            html: `
                <h2>Email Verification</h2>
                <h3>Your OTP is : ${otp}</h3>
                <p>This OTP is valid for 5 minutes.</p>
            `
        });

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        });

    } catch (err) {
console.error(err);
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed to Send OTP"
        });

    }

};

// Verify OTP
exports.verifyOtp = (req, res) => {

    const { email, otp } = req.body;

    const savedOtp = otpStore[email];

    if (!savedOtp) {
        return res.status(400).json({
            success: false,
            message: "OTP Not Found"
        });
    }

    if (savedOtp.expiresAt < Date.now()) {

        delete otpStore[email];

        return res.status(400).json({
            success: false,
            message: "OTP Expired"
        });

    }

    if (savedOtp.otp !== otp) {

        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });

    }

    delete otpStore[email];

    res.status(200).json({
        success: true,
        message: "OTP Verified Successfully"
    });

};