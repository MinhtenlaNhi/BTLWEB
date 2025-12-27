const productCategoryModel = require("../../models/product-category.model");
const treeHelper = require("../../helpers/treeHelper");

module.exports.treeCategory = async (req, res,next) => {
  const productCategory = await productCategoryModel.find({
    deleted: false,
  });
  const tree = treeHelper.tree(productCategory);
  res.locals.tree = tree;
  next();
};
