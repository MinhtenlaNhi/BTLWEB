const md5 = require("md5");
const userModel = require("../../models/user.model");
const generateHelper = require("../../helpers/generate");
const otpModel = require("../../models/forgot-password.model");
const sendEmailHelper = require("../../helpers/sendEmail");

// [POST] /register
module.exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const existUser = await userModel.findOne({
    deleted: false,
    status: "active",
    email,
  });
  if (!existUser) {
    req.body.password = md5(password);
    const newUser = new userModel(req.body);
    await newUser.save();
    res.json({
      code: 200,
      message: "Đăng ký thành công!",
    });
  } else {
    res.json({
      code: 400,
      message: "Tài khoản đã tồn tại!",
    });
  }
};

// [POST] /login
module.exports.login = async (req, res) => {
  const user = req.user;
  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    tokenUser: user.tokenUser,
  });
};

// [POST] /password/forgot
module.exports.forgotPassword = async (req, res) => {
  const emailExist = await userModel.findOne({
    email: req.body.email,
  });
  if (!emailExist) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    });
  } else {
    const otp = generateHelper.generateOTP(8);

    const infoOTP = {
      email: emailExist.email,
      expireAt: new Date(Date.now() + 180 * 1000),
      otp,
    };

    // Gửi otp xác minh
    const subject = "OTP xác nhận đổi mật khẩu";
    const html = `
          Mã OTP xác minh đổi lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút.
          Lưu ý không được để lộ mã OTP
      `;
    sendEmailHelper.sendEmail(emailExist.email, subject, html);
    // End Gửi otp xác minh

    const newInfoOTP = new otpModel(infoOTP);
    await newInfoOTP.save();
    res.json({
      code: 200,
      message: "Thành công!",
      email: emailExist.email,
    });
  }
};

// [POST] /password/otp
module.exports.passwordOTP = async (req, res) => {
  // console.log(req.body);
  const user = await otpModel.findOne({
    email: req.body.email,
    otp: req.body.OTP,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Mã OTP không hợp lệ!",
    });
  } else {
    const userOTP = await userModel.findOne({
      email: user.email,
    });
    res.json({
      code: 200,
      message: "Thành công!",
      tokenUser: userOTP.tokenUser,
    });
  }
};

// [POST] /password/reset
module.exports.resetPassword = async (req, res) => {
  const tokenUser = req.headers.authorization.split(" ")[1];
  const user = await userModel.findOne({
    tokenUser: tokenUser,
  });
  if (!user) {
    res.json({
      code: 400,
      message: "Đổi mật khẩu không thành công!",
    });
  } else {
    await userModel.updateOne(
      {
        tokenUser: tokenUser,
      },
      {
        password: md5(req.body.password),
      }
    );
    res.json({
      code: 200,
      message: "Đổi mật khẩu thành công!",
    });
  }
};

// [GET] /user/update
module.exports.update = async (req, res) => {
  const tokenUser = req.headers.authorization.split(" ")[1];
  if (tokenUser) {
    await userModel.updateOne(
      {
        tokenUser,
      },
      {
        fullName: req.body.infoUser.fullName,
        phone: req.body.infoUser.phone,
        email: req.body.infoUser.email,
        avartar: req.body.infoUser.avartar,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhật thông tin thành công!",
    });
  } else {
    res.json({
      code: 400,
      message: "Cập nhật thông tin không thành công!",
    });
  }
};

// [GET] /user/info

module.exports.info = async (req, res) => {
  const tokenUser = req.headers.authorization.split(" ")[1];
  if (!tokenUser) {
    res.json({
      code: 400,
      message: "Lấy thông tin người dùng không thành công!",
      user,
    });
  } else {
    const user = await userModel
      .findOne({
        tokenUser,
      })
      .select("fullName email phone avartar");
    if (user) {
      res.json({
        code: 200,
        message: "Lấy thông tin người dùng thành công!",
        user,
      });
    } else {
      res.json({
        code: 400,
        message: "Lấy thông tin người dùng không thành công!",
      });
    }
  }
};

module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const tokenUser = req.headers.authorization.split(" ")[1];
  const user = await userModel.findOne({
    tokenUser,
    password: md5(currentPassword),
  });
  if (user) {
    await userModel.updateOne(
      {
        tokenUser,
      },
      {
        password: md5(newPassword),
      }
    );
    res.json({
      code: 200,
      message: "Đổi mật khẩu thành công!",
    });
  }
  else{
    res.json({
      code: 400,
      message: "Mật khẩu hiện tại không đúng!",
    });
  }
}