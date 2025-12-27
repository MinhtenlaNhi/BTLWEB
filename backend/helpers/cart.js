const Product = require("../models/product.model");

module.exports.getProducts = async (listCart,cart) => {
  for (let item of cart.products) {
    const productItem = await Product.findOne({
      _id: item.product_id,
    }).select("thumbnail title price slug");
    console.log(productItem)
    const plainItem = item.toObject();
    plainItem.thumbnail = productItem.thumbnail;
    plainItem.title = productItem.title;
    plainItem.price = productItem.price;
    plainItem.slug = productItem.slug;
    listCart.push(plainItem);
  }
  return listCart;
};
