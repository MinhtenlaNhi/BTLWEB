const express = require("express");
const router = express.Router();
const accountController = require("../../controllers/admin/account.controller");


const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware");
const accountValidate = require("../../validates/admin/account-validate");

router.get("/",accountController.index);
router.get("/create",accountController.create);
router.post("/create-post",
    upload.single("avartar"),
    uploadCloud,
    accountValidate.createPost,
    accountController.createPost);

router.get("/edit/:id",accountController.edit);
router.patch("/edit-post/:id",
    upload.single("avartar"),
    uploadCloud,
    accountValidate.editPost,
    accountController.editPost);



module.exports = router;