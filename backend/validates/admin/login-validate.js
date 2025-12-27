module.exports.post = (req,res,next) => {
    if(req.body.email === "") {
        req.flash("error","Không được để trống tài khoản!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }
    if(req.body.password === "") {
        req.flash("error","Không được để trống mật khẩu!!!");
        const back = req.get("Referer");
        res.redirect(back);
    }

    next();
}