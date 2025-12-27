const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
const userValidate = require("../../validates/client/user-validate"); 
const requiredAuthMiddleware = require("../../middlewares/client/auth-required.middleware");

router.post("/register",userValidate.register,controller.register);
router.post("/login",requiredAuthMiddleware.requiredAuth,controller.login);
router.post("/password/forgot",controller.forgotPassword);
router.post("/password/otp",controller.passwordOTP);
router.post("/password/reset",controller.resetPassword);
router.patch("/update",controller.update);
router.get("/info",controller.info);
router.patch("/change-password",controller.changePassword);




module.exports = router;
