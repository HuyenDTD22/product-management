const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get('/', controller.index); //Trang chủ của product

router.get('/:slug', controller.detail); //Làm trang chi tiết sản phẩm bên Client

module.exports = router;