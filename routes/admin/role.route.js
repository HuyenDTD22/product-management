const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);

router.get("/create", controller.create); //Thêm mới 1 nhóm quyền

router.post("/create", controller.createPost); //Thêm mới 1 nhóm quyền

router.get("/edit/:id", controller.edit); // Chỉnh sửa nhóm quyền

router.patch("/edit/:id", controller.editPatch); // Chỉnh sửa nhóm quyền

router.get("/permissions", controller.permissions); // Xây dựng nhóm phân quyền

router.patch("/permissions", controller.permissionsPatch); // Xây dựng nhóm phân quyền

module.exports = router;