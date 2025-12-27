const alertHelper = require("../../helpers/alert");
const roleModel = require("../../models/roles.model");
const productCategoryModel = require("../../models/product-category.model");
const productModel = require("../../models/product.model");
const accountAdminModel = require("../../models/account-model");
const accountClientModel = require("../../models/user.model");
// [GET] /admin/dashboard
module.exports.index = async(req,res) => {
    let statistic = {
        account: {
            fullName: "",
            email: "",
            phone: "",
            role: ""
        },
        productCategory: {
            quantity: 0,
            active: "",
            inactive: ""
        },
        product: {
            quantity: 0,
            active: "",
            inactive: ""
        },
        accountAdmin: {
            quantity: 0,
            active: "",
            inactive: ""
        },
        accountClient: {
            quantity: 0,
            active: "",
            inactive: ""
        }
    }
    const messages = alertHelper.alert(req);

    // Lấy ra danh sách tài khoản
    const user = res.locals.user;
    statistic.account.fullName = user.fullName;
    statistic.account.email = user.email;
    statistic.account.phone = user.phone;


    const role = await roleModel.findOne({
        _id: user.role_id,
        deleted: false
    })
    if(role){
        statistic.account.role = role.title;

    }

    // End Lấy ra danh sách tài khoản

    // Lấy ra danh mục sản phẩm
    const productCategorys = await productCategoryModel.countDocuments({
        deleted: false
    });
    
    const productCategoryActive = await productCategoryModel.countDocuments({
        deleted: false,
        status: "active"
    })

    const productCategoryInactive = await productCategoryModel.countDocuments({
        deleted: false,
        status: "inactive"
    })
    statistic.productCategory.quantity = productCategorys;
    statistic.productCategory.active = productCategoryActive;
    statistic.productCategory.inactive = productCategoryInactive;
    
    // End Lấy ra danh mục sản phẩm

    // Lấy ra danh sách sản phẩm
    const products = await productModel.countDocuments({
        deleted: false
    });
    
    const productActive = await productModel.countDocuments({
        deleted: false,
        status: "active"
    })

    const productInactive = await productModel.countDocuments({
        deleted: false,
        status: "inactive"
    })
    statistic.product.quantity = products;
    statistic.product.active = productActive;
    statistic.product.inactive = productInactive;
    
    // End Lấy ra danh sách sản phẩm

    // Lấy ra danh sách tài khoản admin
    const accountAdmin = await accountAdminModel.countDocuments({
        deleted: false
    });
    
    const accountAdminActive = await accountAdminModel.countDocuments({
        deleted: false,
        status: "active"
    })

    const accountAdminInactive = await accountAdminModel.countDocuments({
        deleted: false,
        status: "inactive"
    })
    statistic.accountAdmin.quantity = accountAdmin;
    statistic.accountAdmin.active = accountAdminActive;
    statistic.accountAdmin.inactive = accountAdminInactive;
    
    // End Lấy ra danh sách tài khoản admin

    // Lấy ra danh sách tài khoản khách hàng
    const accountClient = await accountClientModel.countDocuments({
        deleted: false
    });
    
    const accountClientActive = await accountClientModel.countDocuments({
        deleted: false,
        status: "active"
    })

    const accountClientInactive = await accountClientModel.countDocuments({
        deleted: false,
        status: "inactive"
    })
    statistic.accountClient.quantity = accountClient;
    statistic.accountClient.active = accountClientActive;
    statistic.accountClient.inactive = accountClientInactive;
    
    // Lấy ra danh sách tài khoản khách hàng
    res.render("admin/pages/dashboard/index",{
        title: "Trang dashboard",
        message: "Trang tổng quan",
        messages,
        statistic
    })
}