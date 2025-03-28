const express = require("express");
const multer = require('multer');
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); //: là truyền data động //Tính năng thay đổi trạng thái sản phẩm

router.patch("/change-multi", controller.changeMulti); //Tính năng thay đổi trạng thái nhiều sản phẩm

router.delete("/delete/:id", controller.deleteItem); // Tính năng xoá 1 sản phẩm

router.get("/create", controller.create); //Tính năng lấy ra trang tạo sản phẩm

router.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPost, // Validate dữ liệu 
    controller.createPost
); //Tính năng tạo mới sản phẩm

router.get("/edit/:id", controller.edit); //Tính năng chỉnh sửa sản phẩm_Lấy ra giao diện chỉnh sửa sản phẩm

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch
); //Tính năng chỉnh sửa sản phẩm

router.get("/detail/:id", controller.detail); //Làm trang chi tiết sản phẩm bên Admin

module.exports = router;