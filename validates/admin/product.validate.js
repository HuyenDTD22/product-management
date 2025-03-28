module.exports.createPost = (req, res, next) => {
    if (!req.body.title) { //Validate dữ liệu
        req.flash("error", `Vui lòng nhập tiêu đề!`); 
        res.redirect("back");
        return;
    }
    next(); //Gọi hàm này để sang bước kế tiếp 
}