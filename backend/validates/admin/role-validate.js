module.exports.editPost = (req,res,next) => {
  if (req.body.title === "" || req.body.description === "") {
    req.flash("error", "Không được để trống vùng này!!!");
    const back = req.get("Referer");
    res.redirect(back);
    return;
  }

  next();
};