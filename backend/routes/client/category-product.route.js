const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/category-product.controller");

router.get("/", controller.index);
router.get("/detail/:slugCategory", controller.getProductsOfCategory);



module.exports = router;
