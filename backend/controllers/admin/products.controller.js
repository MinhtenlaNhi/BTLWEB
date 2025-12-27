const Products = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const prefixAdmin = require("../../config/system").prefixAdmin;
const filterOptionHelper = require("../../helpers/filterOption");
const productCategoryModel = require("../../models/product-category.model");
const accountModel = require("../../models/account-model");
const treeHelper = require("../../helpers/treeHelper");
const alertHelper = require("../../helpers/alert");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const messages = alertHelper.alert(req);

  let find = {
    deleted: false,
  };

  // Phân trang

  let setPagination = {
    currentPage: 1,
    limit: 4,
  };

  if (req.query.page) {
    setPagination.currentPage = Number(req.query.page);
  }
  const totalProduct = await Products.countDocuments({
    deleted: false,
  });
  console.log(totalProduct);
  const totalPage = Math.floor(totalProduct / setPagination.limit);

  setPagination.skip = (setPagination.currentPage - 1) * setPagination.limit;
  setPagination.totalPage = totalPage;

  //End Phân trang

  // Lọc
  let selection = filterOptionHelper();

  let buttons = filterStatusHelper();

  if (req.query.status) {
    const index = buttons.findIndex((item) => item.status == req.query.status);
    buttons[index].class = "btn-success";
    find.status = req.query.status;
  } else {
    buttons[0].class = "btn-success";
  }

  // End Lọc

  // Sắp xếp

  let selectedSort = "";
  let sortParam = {};
  if (req.query.sortValue && req.query.sortBy) {
    sortParam[req.query.sortValue] = req.query.sortBy;

    selectedSort = `${req.query.sortBy}-${req.query.sortValue}`;
  }

  // End Sắp xếp

  const products = await Products.find(find)
    .sort(sortParam)
    .limit(setPagination.limit)
    .skip(setPagination.skip);
  // Tìm kiếm
  const keyword = req.query.keyword;
  const newProduct = products.filter((item) => {
    return item.title.toLowerCase().includes(keyword);
  });
  // End Tìm kiếm

  // Tìm ra user tạo sản phẩm
  for (let product of products) {
    const accountCreate = await accountModel.findOne({
      _id: product.createdBy.account_id,
    });
    if (accountCreate) {
      product.createrProduct = accountCreate.fullName;
    }
    // End Tìm ra user tạo sản phẩm

    // Tìm ra user sửa sản phẩm gần đây nhất
    const updatedCurrent = product.updatedBy.slice(-1)[0];
    if (updatedCurrent) {
      const accountUpdate = await accountModel.findOne({
        _id: updatedCurrent.account_id,
      });
      if (accountUpdate) {
        product.updaterProduct = accountUpdate.fullName;
      }
    }
    // End Tìm ra user sửa sản phẩm gần đây nhất
  }

  res.render("admin/pages/products/index", {
    title: "Danh sách sản phẩm",
    message: "Danh sách sản phẩm",
    data: req.query.keyword ? newProduct : products,
    buttons,
    setPagination,
    messages,
    selectedSort,
    selection,
    keyword,
  });
};

// [PATCH] /admin/products/change-product
module.exports.changeProduct = async (req, res) => {
  const status = req.params.status === "active" ? "inactive" : "active";
  const id = req.params.id;
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };

  await Products.updateOne(
    { _id: id },
    {
      status,
      $push: { updatedBy },
    }
  );

  req.flash("success", "Cập nhật trạng thái thành công!!!");
  const back = req.get("Referer");

  res.redirect(back);
};

// [PATCH] /admin/products/change-many
module.exports.changeMany = async (req, res) => {
  let status = req.body.type;
  const ids = req.body.ids.split(",");
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  switch (status) {
    case "active":
      status = "active";
      await Products.updateMany(
        { _id: { $in: ids } },
        {
          status,
          $push: { updatedBy },
        }
      );
      req.flash(
        "success",
        `Cập nhật trạng thái hoạt động ${ids.length} sản phẩm thành công!!!`
      );

      break;
    case "inactive":
      status = "inactive";
      await Products.updateMany(
        { _id: { $in: ids } },
        {
          status,
          $push: { updatedBy },
        }
      );
      req.flash(
        "success",
        `Cập nhật trạng thái dừng hoạt động ${ids.length} sản phẩm thành công!!!`
      );

      break;
    case "delete-many":
      await Products.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
          },
        }
      );
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!!!`);

      break;
    case "change-position":
      for (let item of ids) {
        const id = item.split("-")[0];
        const position = Number(item.split("-")[1]);

        await Products.updateOne(
          { _id: id },
          {
            position,
            $push: { updatedBy },
          }
        );
      }
      req.flash(
        "success",
        `Thay đổi vị trí ${ids.length} sản phẩm thành công!!!`
      );

      break;
    default:
      break;
  }

  const back = req.get("Referer");
  res.redirect(back);
};

// [PATCH] /admin/products/delete-product
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Products.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );
  const back = req.get("Referer");
  res.redirect(back);
};

// [GET] /admin/products/create

module.exports.create = async (req, res) => {
  const messages = alertHelper.alert(req);

  const productCategories = await productCategoryModel.find({
    deleted: false,
  });
  const categoryTree = treeHelper.tree(productCategories);
  res.render("admin/pages/products/create-product", {
    title: "Thêm mới",
    message: "Trang thêm mới",
    messages,
    categoryTree,
  });
};

// [POST] /admin/products/create-post
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  req.body.price = Number(req.body.price);
  req.body.discountPercentage = Number(req.body.discountPercentage);
  req.body.stock = Number(req.body.stock);

  if (req.body.position === "") {
    const countProduct = await Products.countDocuments();
    req.body.position = countProduct;
  } else {
    req.body.position = Number(req.body.position);
  }

  req.body.createdBy = {
    account_id: res.locals.user.id,
    createdAt: new Date(),
  };
  const products = new Products(req.body);
  await products.save();
  req.flash("success", "Thêm mới sản phẩm thành công!!!");
  res.redirect(`${prefixAdmin}/products`);
};

// [GET] /admin/products/edit
module.exports.edit = async (req, res) => {
  const messages = alertHelper.alert(req);

  const find = {
    deleted: false,
    _id: req.params.id,
  };

  const productCategories = await productCategoryModel.find({
    deleted: false,
  });
  const categoryTree = treeHelper.tree(productCategories);

  const product = await Products.findOne(find);

  res.render("admin/pages/products/edit-product", {
    title: "Trang chỉnh sửa",
    message: "Trang chỉnh sửa",
    data: product,
    messages,
    categoryTree,
  });
};

// [POST] /admin/products/edit-post
module.exports.editPost = async (req, res) => {
  console.log(req.file);
  const id = req.params.id;
  req.body.price = Number(req.body.price);
  req.body.discountPercentage = Number(req.body.discountPercentage);
  req.body.stock = Number(req.body.stock);
  req.body.position = Number(req.body.position);
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };

  await Products.updateOne(
    { _id: id },
    {
      ...req.body,
      $push: { updatedBy: updatedBy },
    }
  );

  req.flash("success", "Cập nhật sản phẩm thành công!!!");
  res.redirect(`${prefixAdmin}/products`);
};

// [GET] /admin/products/detail
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const find = {
    deleted: false,
  };

  const product = await Products.findOne({ _id: id }, find);
  console.log(product);
  res.render("admin/pages/products/detail-product", {
    title: "Chi tiết sản phẩm",
    message: "Chi tiết sản phẩm",
    data: product,
  });
};

// [GET] /admin/products/sort
