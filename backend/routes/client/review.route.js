const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/review.controller");

router.get("/:productId",controller.index);
router.post("/add/:productId",controller.add);
module.exports = router;