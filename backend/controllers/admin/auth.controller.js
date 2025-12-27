const prefixAdmin = require("../../config/system").prefixAdmin;
const accountModel = require("../../models/account-model");
const md5 = require('md5');
const alertHelper = require("../../helpers/alert");


module.exports.login = (req,res) => {
    const messages = alertHelper.alert(req);
    res.render("admin/pages/auth/login",{
        title: "Đăng nhập",
        messages
    })
}

module.exports.post = async(req,res) => {
    console.log(req.password);
    const accountLogin = {
        email: req.body.email,
        // password: md5(req.body.password)
    }
    const account = await accountModel.findOne(accountLogin);

    if(!account) {
        req.flash("error","Tài khoản không tồn tại!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }

    else if(account.password !== md5(req.body.password)){
        req.flash("error","Mật khẩu không đúng!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }

    else if(account.status !== "active"){
        req.flash("error","Tài khoản đã bị khóa!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }
    
    else{
        req.flash("success","Đăng nhập thành công!!!");
        res.cookie("token",account.token);
        res.redirect(`${prefixAdmin}/dashboard`);
    }
}

module.exports.logout = async(req,res) => {
    res.clearCookie("token");
    res.redirect(`${prefixAdmin}/auth/login`);
}