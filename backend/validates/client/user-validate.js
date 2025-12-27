module.exports.register = (req,res,next) => {
    if(req.body.fullName === ""){
        res.json({
            code: 400,
            message: "Họ tên không được để trống!"
        })
        return;

    }
    if(req.body.email === ""){
        res.json({
            code: 400,
            message: "Email không được để trống!"
        })
        return;

    }
    if(req.body.password === ""){
        res.json({
            code: 400,
            message: "Mật khẩu không được để trống!"
        })
        return;

    }
    
    
    next();
}


module.exports.createPost = (req,res,next) => {
    if(req.body.email === ""){
        req.flash("error","Email không được để trống!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }
    next();
}


module.exports.resetPasswordPost = (req,res,next) => {
    if(req.body.password === "") {
        req.flash("error","Không được để trống mật khẩu!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }
    if(req.body.confirm_password === "") {
        req.flash("error","Hãy xác nhận mật khẩu!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }
    if(req.body.password !== req.body.confirm_password){
        req.flash("error","Mật khẩu xác minh không khớp!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }

    next();
}