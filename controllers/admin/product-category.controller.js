const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree");

//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    });
}

//[GET] /admin/product-category/create -Tạo mới 1 danh mục sản phẩm 
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    });
}

//[POST] /admin/product-category/create - Tạo mới 1 danh mục sản phẩm
module.exports.createPost = async (req, res) => { 
    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save(); 

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

//[GET] /admin/product-category/edit/:id -Chỉnh sửa danh mục sản phẩm 
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await ProductCategory.findOne({
            _id: id,
            deleted: false
        });

        const records = await ProductCategory.find({
            deleted: false
        });

        const newRecords = createTreeHelper.tree(records);

        res.render("admin/pages/product-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}

//[PATCH] /admin/product-category/edit/:id -Chỉnh sửa danh mục sản phẩm 
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        await ProductCategory.updateOne({ _id: id }, req.body);
        
        res.redirect("back");
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}

//[DELETE] /admin/product-category/delete/:id - Tính năng xoá 1 danh mục sản phẩm
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id //Lấy ra id

    await ProductCategory.updateOne({
        _id: id
    }, {
        deleted: true,
        deletedAt: new Date()
    }); //cập nhật giá trị của trường deleted là true đồng thời cập nhật luôn thời gian xoá của 1 danh mục sp trong database có id là id

    req.flash("success", `Đã xoá thành công danh mục sản phẩm!`);

    res.redirect("back");
}
