const accountModel = require("../../models/account-model");
const roleModel = require("../../models/roles.model");
const md5 = require("md5");
const prefixAdmin = require("../../config/system").prefixAdmin;
const alertHelper = require("../../helpers/alert");

module.exports.index = async (req, res) => {
  const messages = alertHelper.alert(req);

  const role = await roleModel.findOne({
    _id: res.locals.user.role_id,
  });

  res.render("admin/pages/my-account/index", {
    title: "Thông tin tài khoản",
    message: "Thông tin tài khoản",
    role,
    messages,
  });
};

module.exports.edit = async (req, res) => {
  const messages = alertHelper.alert(req);

  res.render("admin/pages/my-account/edit-my-account", {
    title: "Cập nhật thông tin cá nhân",
    message: "Cập nhật thông tin cá nhân",
    messages
  });
};

module.exports.editPost = async (req, res) => {
  const id = res.locals.user.id;
  const emailExists = await accountModel.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExists) {
    req.flash("error", `Email ${emailExists.email} đã tồn tại!`);
    const back = req.get("Referer");
    res.redirect(back);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await accountModel.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật thành công");
    res.redirect(`${prefixAdmin}/my-account`);
  }
};
