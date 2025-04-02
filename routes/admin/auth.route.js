const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validate");

router.get("/login", controller.login); //Tính năng đăng nhập

router.post(
    "/login",
    validate.loginPost,
    controller.loginPost
); //Tính năng đăng nhập

router.get("/logout", controller.logout); //Tính năng đăng xuất

module.exports = router;