const prefixAdmin = require("../../config/system").prefixAdmin;

const productCategoryModel = require("../../models/product-category.model");
const treeHelper = require("../../helpers/treeHelper");
const alertHelper = require("../../helpers/alert");

module.exports.index = async (req, res) => {
  const messages = alertHelper.alert(req);

  let find = {
    deleted: false,
  };

  const productCategories = await productCategoryModel.find(find);
  const categoryTree = treeHelper.tree(productCategories);
  res.render("admin/pages/product-category/index", {
    title: "Danh mục sản phẩm",
    message: "Danh mục sản phẩm",
    data: categoryTree,
    messages,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const productCategories = await productCategoryModel.find({});
  // console.log(productCategories);
  const categoryTree = treeHelper.tree(productCategories);

  res.render("admin/pages/product-category/create-product-category", {
    title: "Thêm mới danh mục sản phẩm",
    message: "Thêm mới danh mục sản phẩm",
    data: categoryTree,
  });
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await productCategoryModel.updateOne({ _id: id }, { deleted: true });
  req.flash("success", "Xóa thành công 1 danh mục !!!");
  res.redirect(`${prefixAdmin}/product-category`);
};

module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const totalProductCategories = await productCategoryModel.countDocuments();
    req.body.position = totalProductCategories + 1;
  }
  const newProductCategory = new productCategoryModel(req.body);
  await newProductCategory.save();

  res.redirect(`${prefixAdmin}/product-category`);
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  let find = {
    deleted: false,
  };
  const productCategories = await productCategoryModel.find(find);
  const categoryTree = treeHelper.tree(productCategories);
  const productCategory = await productCategoryModel.findOne({ _id: id });
  res.render("admin/pages/product-category/edit-product-category", {
    title: "Chỉnh sửa danh mục sản phẩm",
    message: "Chỉnh sửa danh mục sản phẩm",
    data: productCategory,
    categoryTree,
  });
};

module.exports.editPost = async (req, res) => {
  const id = req.params.id;
  if (req.body.position) {
    req.body.position = Number(req.body.position);
  }

  await productCategoryModel.updateOne({ _id: id }, req.body);
  req.flash("success", "Cập nhật danh mục thành công");

  res.redirect(`${prefixAdmin}/product-category`);
};

module.exports.detail = async (req, res) => {
  const find = {
    _id: req.params.id,
    deleted: false,
  };
  const record = await productCategoryModel.findOne(find);
  const records = await productCategoryModel.find({ deleted: false });
  const parentName = records.find((item) => {
    return item.id === record.parentId;
  });
  res.render("admin/pages/product-category/detail-product-category", {
    title: "Chi tiết danh mục sản phẩm",
    message: "Chi tiết danh mục sản phẩm",
    data: record,
    parentName,
  });
};
