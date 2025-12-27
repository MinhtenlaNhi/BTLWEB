const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.get("/create",controller.create);
router.get("/:cartId",controller.index);
router.post("/add/:productId", controller.add);
router.post("/delete/:productId", controller.delete);
router.post("/remove/:productId", controller.remove);

router.get("/update/:productId/:quantity", controller.update);



module.exports = router;
