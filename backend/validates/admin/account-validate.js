module.exports.createPost = (req,res,next) => {
    req.body.email = req.body.email.trim();
    if(req.body.email === ""){
        req.flash("error","Tài khoản không được để trống!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }

    if(req.body.password === ""){
        req.flash("error","Mật khẩu không được để trống!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }

    if(req.body.fullName === ""){
        req.flash("error","Họ tên không được để trống!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }

    if(!req.body.role_id){
        req.flash("error","Hãy phân quyền cho tài khoản!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }

    next();
}


module.exports.editPost = (req,res,next) => {
    req.body.email = req.body.email.trim();
    if(req.body.email === ""){
        req.flash("error","Tài khoản không được để trống!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }


    if(req.body.fullName === ""){
        req.flash("error","Họ tên không được để trống!!!");
        const back = req.get("Referer");
        res.redirect(back);
        return;

    }



    next();
}