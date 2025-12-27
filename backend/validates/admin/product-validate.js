module.exports.createPost = (req,res,next) => {
  if (req.body.title === "" || !req.file) {
    req.flash("error", "Thêm mới sản phẩm không thành công!!!");
    const back = req.get("Referer");
    res.redirect(back);
    return;
  }

  next();
};

module.exports.editPost = (req,res,next) => {
  if (req.body.title === "") {
    req.flash("error", "Cập nhật sản phẩm không thành công!!!");
    const back = req.get("Referer");
    res.redirect(back);
    return;
  }

  next();
};
