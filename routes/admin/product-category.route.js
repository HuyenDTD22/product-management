const express = require("express");
const multer = require('multer');
const router = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/create", controller.create); //Tạo mới 1 danh mục sản phẩm

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost, 
    controller.createPost
);

router.get("/edit/:id", controller.edit); //Chỉnh sửa danh mục sản phẩm

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);//Chỉnh sửa danh mục sản phẩm

router.delete("/delete/:id", controller.deleteItem); // Tính năng xoá 1 danh mục sản phẩm

module.exports = router;