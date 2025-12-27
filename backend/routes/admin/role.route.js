const express = require('express');
const router = express.Router();
const roleController = require("../../controllers/admin/role.controller");
const roleValidate = require("../../validates/admin/role-validate");
router.get('/', roleController.index);
router.get('/create', roleController.create);
router.post('/create-post', roleController.createPost);
router.get('/permission', roleController.editPermission);
router.patch('/edit-permission', roleController.editPostPermission);
router.get("/detail/:id",roleController.detail);
router.get("/edit/:id",roleController.edit);
router.patch("/edit-post/:id",
    roleValidate.editPost,
    roleController.editPost);

router.delete("/delete/:id",roleController.delete);
module.exports = router;
