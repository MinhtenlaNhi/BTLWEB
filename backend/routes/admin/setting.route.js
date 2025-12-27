const express = require("express");
const router = express.Router();
const settingController = require("../../controllers/admin/setting.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware");

router.get("/general", settingController.general);
router.post(
  "/update-post",
  upload.single("logo"),
  uploadCloud,
  settingController.generalPost
);

module.exports = router;
