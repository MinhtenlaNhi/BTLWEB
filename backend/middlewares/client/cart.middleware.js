const cartModel = require("../../models/cart.model");

module.exports.cart = async (req,res,next) => {
    if(!req.cookies.cartId){
        const cart = new cartModel();
        await cart.save();
        
        const expiresTime = 3600 * 24 * 365 * 1000;
        const attribCookie = {
            expires: new Date(Date.now() + expiresTime)
        }
        res.cookie("cartId",cart.id,attribCookie);
    }

    else{
        const carts = await cartModel.findOne({
            _id: req.cookies.cartId
        });
        const totalProducts = carts.products.reduce((total,item) => {
            return item.quantity + total;
        },0);
        res.locals.totalProducts = totalProducts;
    }
    next();
}