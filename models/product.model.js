const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title", //ăn theo trường tiêu đề phía trên 
        unique: true //Để nếu có các sp có title trùng nhau nó sẽ tạo slug khác nhau để ko bị trùng (nó có thêm id đằng sau) 
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true // thời gian tạo mới sản phẩm //cái này tự động 
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
