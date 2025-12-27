// Xóa 1 danh mục 
const buttonDeletes = document.querySelectorAll("[button-delete-product-category]");
const formDelete = document.querySelector("#form-delete-item");
console.log(formDelete)
if (buttonDeletes) {
  buttonDeletes.forEach((item) => {
    item.addEventListener("click", () => {
      const isDelete = confirm("Bạn có chắc chắn muốn xóa danh mục này");
      if (isDelete) {
        const id = item.getAttribute("id");
        const action =
          formDelete.getAttribute("data-path") + `/${id}?_method=DELETE`;
        formDelete.action = action;
        console.log(action)
        formDelete.submit();
      }
    });
  });
}


// End Xóa 1 danh mục