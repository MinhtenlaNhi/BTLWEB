const userModel = require("../../models/user.model");
const md5 = require("md5");
const cartModel = require("../../models/cart.model");

module.exports.requiredAuth = async (req, res, next) => {

  const {email,password,cartId} = req.body;
  const userLogin = {
    deleted: false,
    email
  };
  const user = await userModel.findOne(userLogin);
  

  if (!user) {
    res.json({
      code: 400,
      message: "Tài khoản không tồn tại!"
    })
    return;
  } 
  if (user.password !== md5(password)) {
    res.json({
      code: 400,
      message: "Mật khẩu không đúng!"
    })
    return;
  } 
  if (user.status !== "active") {
    res.json({
      code: 400,
      message: "Tài khoản đã bị khóa!"
    })
    return;
  }

  await cartModel.updateOne(
    {
      _id: cartId,
    },
    {
      user_id: user.id,
    }
  );
  req.user = user;


  next();
};
