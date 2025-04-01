const express = require('express');
const path = require('path');
const session = require('express-session'); 
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT; // lấy giá trị hằng số biến PORT trong file .env

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Sử dụng cookie-parser
app.use(cookieParser()); 

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//Flash - Thư viện để hiện thị thông báo
app.use(session({
    secret: 'dshfgdgfdffdf', // Chuỗi bí mật để mã hóa session
    resave: false,           // Không lưu session nếu không thay đổi
    saveUninitialized: true, // Lưu session ngay cả khi chưa khởi tạo
    cookie: { maxAge: 60000 } // Thời gian hết hạn session (60 giây)
}));
app.use(flash()); //Sử dụng express-flash

//End Flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//End TinyMCE

//App locals variables - biến toàn cục, sử dụng ở đâu cũng được
app.locals.prefixAdmin = systemConfig.prefixAdmin; // biến prefixAdmin sẽ tồn tại ở trong tất cả các file pug, sử dụng ở đâu cũng được 

app.use(express.static(`${__dirname}/public`));

//Router
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log("dang lang nghe cong 3000")
})