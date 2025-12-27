const accountModel = require("../../models/account-model");
const roleModel = require("../../models/roles.model");
const settingModel = require("../../models/setting.model");


module.exports.auth = async (req, res, next) => {
  const find = {
    deleted: false,
    token: req.cookies.token,
  };
  const user = await accountModel.findOne(find);
  if (req.cookies.token && user) {
    const role = await roleModel.findOne({_id: user.role_id});
    res.locals.role = role;
    res.locals.user = user;
    const setting = await settingModel.findOne({});
    if(setting){
      res.locals.setting = setting;
    }
    else{
      const newSetting = new settingModel();
      await newSetting.save();
    }
    next();
  } else {
    res.redirect("/admin/auth/login");
  }
};
