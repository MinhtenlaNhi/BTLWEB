const cartModel = require("../../models/cart.model");
const Product = require("../../models/product.model");
const cartHelper = require("../../helpers/cart");

// [GET] /cart/create
module.exports.create = async (req, res) => {
  const cart = new cartModel();
  await cart.save();
  if(cart){
    res.json({
      code: 200,
      message: "Thành công!",
      cartId: cart.id,
    });
  }
  else{
    res.json({
      code: 400,
      message: "Thất bại!",
    });
  }
};

// [GET] /cart/:cartId
module.exports.index = async (req, res) => {
  const cartId = req.params.cartId;
  let listCart = [];
  if (cartId) {
    const cart = await cartModel.findOne({
      _id: cartId,
    });

    listCart = await cartHelper.getProducts(listCart, cart);
    console.log(listCart);
    res.json({
      code: 200,
      message: "Thành công!",
      cart: listCart,
    });
  }
  else{
    res.json({
      code: 400,
      message: "Lấy ra giỏ hàng thất bại"
    })
  }
};
// [POST] /cart/add/:productId
module.exports.add = async (req, res) => {
  const idCart = req.body.cartId;
  const idProduct = req.params.productId;
  const quantity = Number(req.body.quantity);

  const quantityProduct = await Product.findOne({
    _id: idProduct,
  }).select("stock");

  let productInfo = {
    product_id: idProduct,
    quantity,
  };
  const cart = await cartModel.findOne({
    _id: idCart,
  });

  const productExist = cart.products.find((item) => {
    return item.product_id === idProduct;
  });
  console.log(productExist);
  if (quantityProduct.stock > 0) {
    let listCart = [];

    if (!productExist) {
      await cartModel.updateOne(
        {
          _id: idCart,
        },
        {
          $push: { products: productInfo },
        }
      );
      listCart = await cartHelper.getProducts(listCart, cart);
      res.json({
        code: 200,
        message: `Thêm thành công ${quantity} sản phẩm vào giỏ hàng!`,
        cart: listCart,
      });
    } else {
      if (quantityProduct.stock > productExist.quantity) {
        productInfo.quantity = quantity + productExist.quantity;
        await cartModel.updateOne(
          {
            _id: idCart,
            "products.product_id": idProduct,
          },

          { "products.$.quantity": productInfo.quantity }
        );
        listCart = await cartHelper.getProducts(listCart, cart);
        listCart.forEach((item) => {
          if (item.product_id === idProduct) {
            item.quantity += 1;
          }
        });
        res.json({
          code: 200,
          message: `Thêm thành công ${quantity} sản phẩm vào giỏ hàng!`,
          cart: listCart,
        });
      } else {
        res.json({
          code: 400,
          message: "Vượt quá số lượng tồn kho!",
        });
      }
    }
  } else {
    res.json({
      code: 400,
      message: "Vượt quá số lượng tồn kho!",
    });
  }
  // res.json("OK")
};

// [POST] /cart/delete/:productId

module.exports.delete = async (req, res) => {
  const idProduct = req.params.productId;
  const idCart = req.body.cartId;
  const quantity = Number(req.body.quantity);
  let productInfo = {
    product_id: idProduct,
    quantity,
  };
  const cart = await cartModel.findOne({
    _id: idCart,
  });
  const productExist = cart.products.find((item) => {
    return item.product_id === idProduct;
  });
  productInfo.quantity = productExist.quantity - quantity;
  await cartModel.updateOne(
    {
      _id: idCart,
      "products.product_id": idProduct,
    },

    { "products.$.quantity": productInfo.quantity }
  );

  let listCart = [];
  listCart = await cartHelper.getProducts(listCart, cart);
  listCart.forEach((item) => {
    if (item.product_id === idProduct) {
      item.quantity -= 1;
    }
  });
  res.json({
    code: 200,
    message: `Xóa thành công ${quantity} sản phẩm khỏi giỏ hàng!`,
    cart: listCart,
  });
};

// [POST] /cart/remove/:productId
module.exports.remove = async (req, res) => {
  const idCart = req.body.cartId;
  const productId = req.params.productId;

  if (productId) {
    await cartModel.updateOne(
      {
        _id: idCart,
      },
      {
        $pull: { products: { product_id: productId } },
      }
    );
    const cart = await cartModel.findOne({
      _id: idCart,
    });
    let listCart = [];
    listCart = await cartHelper.getProducts(listCart, cart);
    res.json({
      code: 200,
      message: "Xóa nhiều sản phẩm thành công!",
      cart: listCart,
    });
  } else {
    res.json({
      code: 400,
      message: "Xóa nhiều sản phẩm không thành công!",
    });
  }
};

// [GET] /cart/update/:idProduct/quantity

module.exports.update = async (req, res) => {
  const idCart = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = Number(req.params.quantity);
  const product = await Product.findOne({
    deleted: false,
    status: "active",
    _id: productId,
  });

  if (product.stock < quantity) {
    req.flash("error", "Số lượng sản phẩm không đủ!");
    const back = req.get("Referer");
    res.redirect(back);
    return;
  }

  const productInfo = {
    product_id: productId,
    quantity,
  };
  await cartModel.updateOne(
    {
      _id: idCart,
      "products.product_id": productInfo.product_id,
    },

    { "products.$.quantity": productInfo.quantity }
  );

  req.flash("success", "Cập nhật giỏ hàng thành công!");
  const back = req.get("Referer");
  res.redirect(back);
};
