const express = require("express");
const router = express.Router();
const myAccountController = require("../../controllers/admin/my-account.controller");


const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware");

router.get("/",myAccountController.index);
router.get("/edit",
    myAccountController.edit);
    
router.patch("/create-post",
    upload.single("avartar"),
    uploadCloud,
    myAccountController.editPost
)

module.exports = router;