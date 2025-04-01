//Delete Item - Tính năng xoá 1 danh mục sản phẩm
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xoá danh mục sản phẩm này không?"); //Trả về true or false

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