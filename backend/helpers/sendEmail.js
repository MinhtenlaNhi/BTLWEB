const nodemailer = require("nodemailer");

module.exports.sendEmail = (email,subject,html) => {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dinhkhanh3107@gmail.com",
      pass: "ayig wvia cazb mfxu"
    },
  });
  const mailOptions = {
    from: "dinhkhanh3107@gmail.com",
    to: email,
    subject,
    html,
  };
  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send:",info.response);
    }
  });
};
