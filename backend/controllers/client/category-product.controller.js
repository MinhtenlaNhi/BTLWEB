const getSubCategoryHelper = require("../../helpers/getSubCategory");

const productModel = require("../../models/product.model");
const productCategoryModel = require("../../models/product-category.model");
const treeHelper = require("../../helpers/treeHelper");

module.exports.index = async(req, res) => {
  // Lấy ra danh mục sản phẩm
  const productCategory = await productCategoryModel.find({
    status: "active",
    deleted: false,
  });
  // End Lấy ra danh mục sản phẩm
  
  const treeCategory = treeHelper.tree(productCategory);
  
  res.json({
    code: 200,
    message: "Thành công!",
    productCategory,
    treeCategory
  });
  
}


module.exports.getProductsOfCategory = async(req,res) => {
  const slug = req.params.slugCategory;
  const category = await productCategoryModel.findOne({
    status: "active",
    deleted: false,
    slug
  });
  
  const arrayCategories = await getSubCategoryHelper.getCategories(category.id);
  const idCategories = arrayCategories.map(item => item.id);
  
  // Lấy ra 10 sản phẩm để hiển thị ở trang chủ 
  const products = await productModel.find({
    status: "active",
    deleted: false,
    product_category_id: {$in: [category.id,...idCategories]}
  });
  // End Lấy ra 10 sản phẩm để hiển thị ở trang chủ 

  res.json({
    category,
    products
  });
}