const Product = require("../../models/product.model");

//[GET] /products - Hiển thị ra danh sách sản phẩm 
module.exports.index = async (req, res) => {
    //Chỉ lấy ra các sản phẩm có status và deleted theo yêu cầu 
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc"}); //sắp xếp sản phẩm theo vị trí giảm dần

    //Tính giá mới cho sản phẩm 
    const newProducts = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    });

    console.log(newProducts);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    });
};

//[GET] /products/:slug - Làm trang chi tiết sản phẩm bên Client
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
    
        const product = await Product.findOne(find);
    
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`/products`);
    }
};