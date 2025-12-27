const settingModel = require("../../models/setting.model");
const alertHelper = require("../../helpers/alert");

module.exports.general = async (req, res) => {
    const messages = alertHelper.alert(req);
    const setting = await settingModel.findOne({
        _id: res.locals.setting
    })
  res.render("admin/pages/settings/general", {
    title: "Cài đặt chung",
    messages,
    setting
  });
};

module.exports.generalPost = async (req, res) => {
  
  await settingModel.updateOne(
    {
      _id: res.locals.setting.id,
    },
    req.body
  );

  req.flash("success","Cập nhật thành công!")
  const back = req.get("Referer");
  res.redirect(back);
};
