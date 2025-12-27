const routerProduct = require("./product.route");
const routerCategoryProduct = require("./category-product.route");
const routerSearch = require("./search.route");
const cartSearch = require("./cart.route");
const routerCheckout = require("./checkout.route");
const routerUser = require("./user.route");
const routerHome = require("./home.route");
const routerReview = require("./review.route.js");

const treeCategoryMiddleware = require("../../middlewares/client/treeCategory-middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware.js");

// const settingMiddleware = require("../../middlewares/client/setting.middleware");


module.exports = (app) => {
  // app.use(treeCategoryMiddleware.treeCategory);
  // app.use(cartMiddleware.cart);
  // app.use(userMiddleware.user);
  // app.use(settingMiddleware.setting);

  app.use("/",routerHome);
  app.use("/category-product",routerCategoryProduct);  
  app.use("/products",routerProduct);
  app.use("/search",routerSearch);
  app.use("/cart",cartSearch);
  app.use("/checkout",routerCheckout);
  app.use("/user",routerUser);
  app.use("/review",routerReview);
  

  
}


