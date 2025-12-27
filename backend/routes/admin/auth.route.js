const express = require("express");
const router = express.Router();
const authController = require("../../controllers/admin/auth.controller");
const authValidate = require("../../validates/admin/login-validate");
router.get("/login",authController.login);
router.post("/login",
    authValidate.post,
    authController.post);

router.get("/logout",authController.logout)


module.exports = router;