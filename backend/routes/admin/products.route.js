
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");
const multer = require("multer");
// const storage = require("../../config/multer");
// const upload = multer({ storage: storage() });
const productValidate = require("../../validates/admin/product-validate");
const upload = multer({ storage: multer.memoryStorage() });
router.get("/", controller.index);
router.patch("/change-product/:status/:id", controller.changeProduct);
router.patch("/change-many", controller.changeMany);
router.delete("/delete-product/:id", controller.deleteProduct);
router.get("/detail/:id", controller.detail);
router.get("/create", controller.create);
// router.post(
//   "/create-post",
//   upload.single("thumbnail"),
//   productValidate.createPost,
//   controller.createPost
// );
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware");

router.post(
  "/create-post",
  upload.single("thumbnail"),
  uploadCloud,
  productValidate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch("/edit-post/:id",
  upload.single("thumbnail"),
  uploadCloud,
  productValidate.editPost,
  controller.editPost);


module.exports = router;
