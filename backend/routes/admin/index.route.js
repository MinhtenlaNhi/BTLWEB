const pathAdmin = require("../../config/system");
const routerDashboard = require("./dashboard.route");
const routerProducts = require("./products.route");
const routerProductCategoy = require("./product-category.route");
const routerRoles = require("./role.route");
const routerAccounts = require("./account.route");
const routerAuth = require("./auth.route");
const routerMyAccount = require("./my-account.route");
const routerSetting = require("./setting.route");


const requireAuth = require("../../middlewares/admin/requireAuth-middleware");

module.exports = (app) => {
  app.use(
    pathAdmin.prefixAdmin + "/dashboard",
    requireAuth.auth,
    routerDashboard
  );
  app.use(
    pathAdmin.prefixAdmin + "/products",
    requireAuth.auth,
    routerProducts
  );
  app.use(
    pathAdmin.prefixAdmin + "/product-category",
    requireAuth.auth,
    routerProductCategoy
  );
  app.use(
    pathAdmin.prefixAdmin + "/roles",
    requireAuth.auth,
    routerRoles
  );
  app.use(
    pathAdmin.prefixAdmin + "/accounts",
    requireAuth.auth,
    routerAccounts
  );
  app.use(
    pathAdmin.prefixAdmin + "/auth",
    routerAuth
  );
  app.use(
    pathAdmin.prefixAdmin + "/my-account",
    requireAuth.auth,
    routerMyAccount
  );
  app.use(
    pathAdmin.prefixAdmin + "/setting",
    requireAuth.auth,
    routerSetting
  );
};
