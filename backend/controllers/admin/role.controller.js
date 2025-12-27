const roleModel = require("../../models/roles.model");
const prefixAdmin = require("../../config/system").prefixAdmin;
const accountModel = require("../../models/account-model");
const alertHelper = require("../../helpers/alert");

module.exports.index = async (req, res) => {
  const messages = alertHelper.alert(req);

  const roles = await roleModel.find({
    deleted: false,
  });

  for (let role of roles) {
    // lấy ra user tạo role
    const accountCreate = await accountModel.findOne({
      _id: role.createdBy.account_id,
    });
    if (accountCreate) {
      role.createrRole = accountCreate.fullName;
    }

    // End lây ra user tạo role
    // Lấy ra user cập nhật role
    const updatedCurrent = role.updatedBy.slice(-1)[0];
    if (updatedCurrent) {
      const accountUpdate = await accountModel.findOne({
        _id: updatedCurrent.account_id,
      });
      if (accountUpdate) {
        role.updaterRole = accountUpdate.fullName;
      }
    }

    // End Lấy ra user cập nhật role
  }
  res.render("admin/pages/role/index", {
    title: "Danh sách nhóm quyền",
    message: "Nhóm quyền",
    data: roles,
    messages,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/role/create-role", {});
};

module.exports.createPost = async (req, res) => {
  // console.log(res.locals.user)
  req.body.createdBy = {
    account_id: res.locals.user.id,
    createdAt: new Date(),
  };
  const newRole = new roleModel(req.body);
  await newRole.save();
  req.flash("success", "Thêm mới nhóm quyền thành công!!!");
  res.redirect("/admin/roles");
};

module.exports.editPermission = async (req, res) => {
  const messages = alertHelper.alert(req);

  const roles = await roleModel.find({
    deleted: false,
  });

  res.render("admin/pages/role/permission-role", {
    title: "Phân quyền",
    message: "Phân quyền",
    roles,
    messages,
  });
};

module.exports.editPostPermission = async (req, res) => {
  const roles = JSON.parse(req.body.permissions);

  for (let item of roles) {
    await roleModel.updateOne(
      { _id: item.id },
      { permissions: item.permissions }
    );
  }

  req.flash("success", "Cập nhật phân quyền thành công!!!");

  res.redirect(`${prefixAdmin}/roles/permission`);
};

module.exports.detail = async (req, res) => {
  const role = await roleModel.findOne(
    { _id: req.params.id },
    { deleted: false }
  );
  console.log(role);

  // res.send("OK");
  res.render("admin/pages/role/detail-role", {
    title: "Chi tiết nhóm quyền",
    message: "Chi tiết nhóm quyền",
    data: role,
  });
};

module.exports.edit = async (req, res) => {
  const role = await roleModel.findOne(
    { _id: req.params.id },
    { deleted: false }
  );
  const messages = alertHelper.alert(req);

  res.render("admin/pages/role/edit-role", {
    title: "Chỉnh sửa nhóm quyền",
    message: "Chỉnh sửa nhóm quyền",
    data: role,
    messages,
  });
};

module.exports.editPost = async (req, res) => {
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  await roleModel.updateOne(
    { _id: req.params.id },
    {
      ...req.body,
      $push: { updatedBy },
    }
  );
  req.flash("success", "Chỉnh sửa nhóm quyền thành công!!!");
  res.redirect(`${prefixAdmin}/roles`);
};

module.exports.delete = async (req, res) => {
  const deletedBy = {
    account_id: res.locals.user.id,
    deletedAt: new Date(),
  };
  await roleModel.updateOne(
    { _id: req.params.id },
    {
      deleted: true,
      deletedBy,
    }
  );
  req.flash("success", "Xóa nhóm quyền thành công!!!");
  const back = req.get("Referer");
  res.redirect(back);
};
