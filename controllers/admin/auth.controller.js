const md5 = require("md5");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

//[GET] /admin/auth/login - Tính năng đăng nhập
module.exports.login = (req, res) => {
    if (req.cookies.token) { 
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.render("admin/pages/auth/login", {
            pageTitle: "Trang đặng nhập",
        });
    }
}

//[POST] /admin/auth/login - Tính năng đăng nhập
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    });

    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if(user.status == "inactive") {
        req.flash("error", "tài khoản đã bị khoá!");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

//[GET] /admin/auth/logout - Tính năng đăng xuất
module.exports.logout = (req, res) => {
    res.clearCookie("token"); //Xoá token trong cookie 
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}