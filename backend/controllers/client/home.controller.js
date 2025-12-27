const settingModel = require("../../models/setting.model");
const productCategoryModel = require("../../models/product-category.model");


module.exports.index = async(req, res) => {
  const setting = await settingModel.findOne({});

  const categories = await productCategoryModel.find({
    status: "active",
    deleted: false
  });
  
  res.json({
    code: 200,
    message: "Thành công!",
    setting
  });
  
}