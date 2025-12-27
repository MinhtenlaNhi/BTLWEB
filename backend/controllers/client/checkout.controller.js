const CartModel = require("../../models/cart.model");
const cartHelper = require("../../helpers/cart");
const orderModel = require("../../models/order.model");
const userModel = require("../../models/user.model");

// [POST] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.body.cartId;
  const tokenUser = req.headers.authorization.split(" ")[1];
  const user = await userModel.findOne({
    deleted: false,
    status: "active",
    tokenUser
  });
  if(!user || !cartId){
    res.json({
      code: 400,
      message: "Đặt hàng không thành công"
    });
  }
  else{
    const objectOrder = {
      user_id: user.id,
      cart_id: cartId,
      userInfo: {},
      products: [],
    };
    const userInfo = {
      fullName: req.body.inforUser.fullName,
      phone: req.body.inforUser.phone,
      address: req.body.inforUser.address,
    };
    objectOrder.userInfo = userInfo;
    const cart = await CartModel.findOne({
      _id: cartId,
    });
    if(!cart){
      res.json({
        code: 400,
        message: "Đặt hàng không thành công"
      });
      return;
    }
    let listCart = [];
    listCart = await cartHelper.getProducts(listCart,cart);
    for (let item of listCart) {
        const product = {
          product_id: item.product_id,
          thumbnail: item.thumbnail,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        };
        objectOrder.products.push(product);
      }
    const order = new orderModel(objectOrder);
    await CartModel.updateOne({
      _id: cartId
    },{
      products: []
    })
    await order.save();
    res.json({
      code: 200,
      message: "Đặt hàng thành công!",
      order: objectOrder
    });

  }

};

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const tokenUser = req.headers.authorization.split(" ")[1];
  const user = await userModel.findOne({
    tokenUser
  });
  if(user){
    const orders = await orderModel.find({
      user_id: user.id
    }).select("createdAt products")
    res.json({
      code: 200,
      message: "Lấy ra đơn hàng thành công!",
      orders
    })
  }
  else{
    res.json({
      code: 400,
      message: "Không có đơn hàng nào!"
    });
  }
}