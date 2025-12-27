const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloud = require('../../middlewares/admin/uploadCloud-middleware');
const productCategoryController = require('../../controllers/admin/product-category.controller');

router.get('/', productCategoryController.index);
router.get('/create', productCategoryController.create);
router.post('/create-post',
    upload.single("thumbnail"),
    uploadCloud,
    productCategoryController.createPost);

router.delete("/delete-product-category/:id",productCategoryController.delete);

router.get('/detail/:id', productCategoryController.detail);

router.get('/edit/:id',
    upload.single("thumbnail"),
    uploadCloud,
    productCategoryController.edit);

router.post('/edit-post/:id',
    upload.single("thumbnail"),
    uploadCloud,
    productCategoryController.editPost);
module.exports = router;