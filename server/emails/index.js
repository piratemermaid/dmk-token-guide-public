const {
    EMAIL: { SENDER_ADDRESS }
} = require("../secrets");

const ORIGIN_URL = "dmktokenguide.com";
// const ORIGIN_URL =
//     process.env.NODE_ENV === "development"
//         ? "localhost:8080"
//         : "dmktokenguide.com";

const options = {
    from: SENDER_ADDRESS
};

const passwordReset = (token) => {
    return {
        ...options,
        subject: "DMK Token Guide: Password Reset",
        text:
            "You have requested a password reset for DMK Token Guide." +
            "Please click on the following link or paste into your browser within 30 minutes of receiving this email." +
            `https://${ORIGIN_URL}/reset/${token}` +
            "If you did not request a password reset, please ignore this email.",
        html:
            "You have requested a password reset for DMK Token Guide.<br/>" +
            "Please click on the following link or paste into your browser within 30 minutes of receiving this email:<br/>" +
            `https://${ORIGIN_URL}/reset/${token}<br/>` +
            "If you did not request a password reset, please ignore this email."
    };
};

const signup = (token) => {
    return {
        ...options,
        subject: "DMK Token Guide: Account Verification",
        text:
            "You have requested a user account for DMK Token Guide: with this email." +
            "Please click on the following link or paste into your browser within 2 hours of receiving this email." +
            `https://${ORIGIN_URL}/verify/${token}` +
            "If you did not request an account, please ignore this email.",
        html:
            "You have requested a user account for DMK Token Guide: with this email.<br/>" +
            "Please click on the following link or paste into your browser within 2 hours of receiving this email:<br/>" +
            `https://${ORIGIN_URL}/verify/${token}<br/>` +
            "If you did not request an account, please ignore this email."
    };
};

const updateEmailOld = (token, email) => {
    return {
        ...options,
        subject: "DMK Token Guide: Account Email Change",
        text:
            `We have received a request to update your account email to: ${email}.` +
            "If you did not make this request, please visit the following link " +
            "to keep this email address on the account:" +
            `https://${ORIGIN_URL}/verify_email_change/${token}` +
            "If you believe your account has been compromised, please contact " +
            "dmktokenguide@gmail.com.",
        html:
            `We have received a request to update your account email to: ${email}.<br/>` +
            "If you did not make this request, please visit the following link " +
            "to keep this email address on the account:<br/>" +
            `https://${ORIGIN_URL}/verify_email_change/${token}<br/>` +
            "If you believe your account has been compromised, please contact " +
            "dmktokenguide@gmail.com."
    };
};

const updateEmailNew = (token) => {
    return {
        ...options,
        subject: "DMK Token Guide: Account Email Change",
        text:
            "We have received a request to update your account email to this email." +
            "To confirm, please visit the following link " +
            `https://${ORIGIN_URL}/verify_email_change/${token}` +
            "If you did not make this request, please ignore this email.",
        html:
            "We have received a request to update your account email to this email.<br/>" +
            "To confirm, please visit the following link " +
            `https://${ORIGIN_URL}/verify_email_change/${token}<br/>` +
            "If you did not make this request, please ignore this email."
    };
};

module.exports = { passwordReset, signup, updateEmailOld, updateEmailNew };
