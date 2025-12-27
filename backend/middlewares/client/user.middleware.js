const userModel = require("../../models/user.model");

module.exports.user = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await userModel.findOne({
      deleted: false,
      tokenUser: req.cookies.tokenUser,
    });
    res.locals.user = user;
  }
  next();
};