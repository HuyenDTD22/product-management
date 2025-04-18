/* Button Status, khi click vào nút hoạt đọng sẽ hiện ra các sản phẩm đang hoạt động, ... */
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status); //Truyền status lên url
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href; //câu lệnh chuyển hướng sang trang khác, cụ thể là chuyển hướng sang trang có url là url.href 
        });
    });
}

/* End Button Status */

/* Form Search, chức năng tìm kiếm sản phẩm */
const formSearch = document.querySelector("#form-search");

if (formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); //ngăn chặn sự kiện mặc định để khỏi load lại trang 
        const keyword = e.target.elements.keyword.value; // lấy được value đã search

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}

/* End Form Search */


/* Pagination - Phân trang */
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    });
}

/* End Pagination */

/* Checkbox Multi - Tính năng thay đổi trạng thái nhiều sản phẩm */
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    //Khi tích vào ô inputCheckAll thì tất cả các ô inputsId tự động được tích vào
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });

    //Khi tích đủ tất cả các ô inputsId thì ô inputCheckAll tự động được tích, còn nếu không tích đủ inputsId thì ô inputCheckAll không được tích
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length; 
       
            if (countChecked == inputsId.length) { //Kiểm tra xem số lượng ô được tích có bằng tổng số ô ở trang đó không
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}

/* End Checkbox Multi */

/* Form Change Multi - Tính năng thay đổi trạng thái nhiều sản phẩm */
const formChangeMulti = document.querySelector("[form-change-multi]"); //Lấy ra cái form
if (formChangeMulti) { //Check xem có tồn tại cái form đấy không 
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); //Để làm cho không load sang trang mới

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked"); //Lấy ra các ô được tích

        //Tính năng xoá nhiều sản phẩm
        const typeChange = e.target.elements.type.value;

        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xoá những sản phẩm này không?");

            if (!isConfirm) {
                return; //Nếu xác nhận không xoá tất cả thì đoạn code phía sau khôgn cần thực hiện nữa 
            }
        }
        //End

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(input => {
                const id = input.value; //Lấy id của các ô được tích

                //Tính năng thay đổi thứ tự sản phẩm
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value; // tìm giá trị của ô input có name="position" trong cùng một hàng (<tr>) chứa input

                    ids.push(`${id}-${position}`); //push cả id và vị trí vào 
                } else {
                    ids.push(id);
                }
            });

            inputIds.value = ids.join(", "); //Chuyển nó thành text

            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi!");
        }
    });
}

/* End Form Change Multi */

/* Show Alert - Tính năng hiển thị thông báo */
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    //Sau bao nhiêu lâu đó thì cửa sổ thông báo tự động mất
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    //Click vào dấu x là đóng luôn
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}

/* End Show Alert */

/* Upload Image - Hiển thị ảnh xem trước trong tính năng tạo mới sản phẩm */
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}

/* End Upload Image */

/* Sort - Tính năng sắp xếp sản phẩm theo nhiều tiêu chí */
const sort = document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    //Sắp xếp
    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    //Xoá sắp xếp
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });

    //Thêm selected cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionselected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionselected.selected = true;
    }
}

/* End Sort*/