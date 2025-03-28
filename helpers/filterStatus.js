//Tính năng lọc trạng thái 
module.exports = (query) => {
    let filterStatus = [{
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];

    if (query.status) { //req.query là trả về các câu truy vấn trên url
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active"; // mặc định nút đó được bôi đậm 
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
}