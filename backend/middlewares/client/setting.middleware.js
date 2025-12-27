const settingModel = require("../../models/setting.model");


module.exports.setting = async(req,res,next) => {
    const setting = await settingModel.findOne({});
    res.locals.setting = setting;
    next();
}