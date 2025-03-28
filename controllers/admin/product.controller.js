const Product = require("../../models/product.model");

const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

//[GET] /admin/products
module.exports.index = async (req, res) => {
    //Tính năng lọc trạng thái
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false,
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    //Tính năng tìm kiếm sản phẩm
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination - Phân trang
    const countProducts = await Product.countDocuments(find); //Đếm số lượng sản phẩm có trong database

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    );
    // End Pagination

    const products = await Product.find(find)
        .sort({ position: "desc"}) //sắp xếp giảm dần theo vị trí
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip); // lấy ra 4 sản phẩm đầu tiên bắt đầu từ vị trí objectPagination.skip

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/products/change-status/:status/:id - Tính năng thay đổi trạng thái sản phẩm
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status }) //Hàm update 1 sản phẩm trong database
    
    req.flash("success", "Cập nhật trạng thái thành công!");

    res.redirect("back"); //Làm cho khi click vào nó link sang 1 trang khác rồi sẽ tự động chuyển hướng về trang trước(hay còn gọi là trang hiện tại) 
}

//[PATCH] /admin/products/change-multi - Tính năng thay đổi trạng thái nhiều sản phẩm
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type; //Lây ra type là active hay inactive
    const ids = req.body.ids.split(", "); //Lấy ra các id của các phần tử được tích trong ids rồi convert sang 1 mảng
    
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" }); //update giá trị của trường status thành "active" đối với những tài liệu có _id nằm trong danh sách ids.
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all": //Tính năng xoá nhiều sản phẩm 
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() }); 
            req.flash("success", `Đã xoá thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position": //Tính năng thay đổi vị trí của nhiều sản phẩm
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                await Product.updateOne({ _id: id }, { position: position}); 
            }
            req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }
    res.redirect("back");
}

//[DELETE] /admin/products/delete/:id - Tính năng xoá 1 sản phẩm
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id //Lấy ra id

    await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() }); //cập nhật giá trị của trường deleted là true đồng thời cập nhật luôn thời gian xoá của 1 sp trong database có id là id
    
    req.flash("success", `Đã xoá thành công sản phẩm!`);

    res.redirect("back");
}

//[GET] /admin/products/create - //Tính năng lấy ra trang tạo sản phẩm
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
    });
}

//[POST] /admin/products/create - Tính năng thêm mới sản phẩm
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    
    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const product = new Product(req.body); //Tạo 1 sản phẩm mới
    await product.save(); //Lưu vào database

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

//[GET] /admin/products/edit/:id - //Tính năng chỉnh sửa sản phẩm_Lấy ra giao diện chỉnh sửa sản phẩm 
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find);
    
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

//[PATCH] /admin/products/edit/:id - //Tính năng chỉnh sửa sản phẩm 
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({ _id: id }, req.body); 
        req.flash("success", `Cập nhật thành công!`);
    } catch (error) {
        req.flash("error", `Cập nhật thất bại!`);
    }

    res.redirect("back");
}

//[GET] /admin/products/detail/:id - //Làm trang chi tiết sản phẩm bên Admin
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find);
    
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
