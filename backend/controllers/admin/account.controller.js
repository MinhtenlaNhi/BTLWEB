const accountModel = require("../../models/account-model");
const roleModel = require("../../models/roles.model");
const md5 = require('md5');
const prefixAdmin = require("../../config/system").prefixAdmin;
const alertHelper = require("../../helpers/alert");

module.exports.index = async(req,res) => {
    const messages = alertHelper.alert(req);
    let find = {
        deleted: false
    }
    const accounts = await accountModel.find({
        _id: {$ne: res.locals.user.id},
        deleted: false
    }).select("-password -token");
    const roles = await roleModel.find(find);
   

    res.render("admin/pages/account/index",{
        title: "Danh sách tài khoản",
        message: "Danh sách tài khoản",
        messages,
        data: accounts,
        roles

    })
}


module.exports.create = async(req,res) => {
    const messages = alertHelper.alert(req);
    const roles = await roleModel.find({deleted: false});
    
    res.render("admin/pages/account/create-account",{
        title: "Thêm mới tài khoản",
        message: "Thêm mới tài khoản",
        roles,
        messages
    })
}


module.exports.createPost = async(req,res) => {
    const account = await accountModel.findOne({email: req.body.email});
    if(account){
        req.flash("error",`Email ${account.email} đã tồn tại!!!`)
        const back = req.get("Referer");
        res.redirect(back);
    }

    else{
        req.body.password = md5(req.body.password);
        const newAccount = new accountModel(req.body);
        await newAccount.save();
        req.flash("success","Tạo tài khoản thành công!!!")
        res.redirect(`${prefixAdmin}/accounts`)

    }
}


module.exports.edit = async(req,res) => {
    const messages = alertHelper.alert(req);

    const id = req.params.id;
    const user = await accountModel.findOne({
        _id: id
    });
    const roles = await roleModel.find({deleted: false});
    res.render("admin/pages/account/edit-account",{
        title: "Chỉnh sửa tài khoản",
        message: "Chỉnh sửa tài khoản",
        user,
        roles,
        messages
    })
}


module.exports.editPost = async(req,res) => {
    const id = req.params.id;

    const emailExists = await accountModel.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    });
    if(emailExists){
        req.flash("error",`Email ${emailExists.email} đã tồn tại!`);
        const back = req.get("Referer");
        res.redirect(back);
    }

    else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
            
        }
        else{
            delete req.body.password;
        }

        await accountModel.updateOne({_id: id},req.body);
        res.redirect(`${prefixAdmin}/accounts`)
    }
}

