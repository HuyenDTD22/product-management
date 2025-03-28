//Change Status - Tính năng thay đổi trạng thái sản phẩm
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status"); //Lấy ra form ở file index.pug
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action; //Gán lại giá trị action cho form

            formChangeStatus.submit();
        });
    });
}

//End Change Status

//Delete Item - Tính năng xoá 1 sản phẩm
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?"); //Trả về true or false

            if (isConfirm) {
                const id = button.getAttribute("data-id"); //Lấy ra id của sản phẩm
                
                const action = `${path}/${id}?_method=DELETE`; //Nối chuỗi thành url hoàn chỉnh
                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        });
    });
}

// End Delete Item 