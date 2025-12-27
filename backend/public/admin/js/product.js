// Change product

const buttonChange = document.querySelectorAll("[button-change-status]");

if (buttonChange) {
  buttonChange.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const status = item.getAttribute("data-status");

      const formChangeStatus = document.getElementById("form-change-status");
      const path = formChangeStatus.getAttribute("data-path");
      const action = path + `/${status}/${id}?_method=patch`;
      formChangeStatus.action = action;

      // const alertSucces = document.querySelector(".alert");
      // alertSucces.classList.remove("d-none");
      formChangeStatus.submit();
    });
  });
}

//End Change product

// Change Many

function checkInput() {
  const table = document.querySelector("table");
  if (table) {
    const checkAll = table.querySelector("[name='checkall']");

    const formChangeMulti = document.querySelector("[form-change-multi]");

    if (formChangeMulti) {
      const selection = document.querySelector("[selection-action]");
      const value = selection.value;

      const text = formChangeMulti.querySelector("input[type='text']");
      let ids = [];
      if (value !== "change-position") {
        const inputs = document.querySelectorAll("[input-item]");
        checkAll.addEventListener("change", () => {
          if (checkAll.checked) {
            inputs.forEach((item) => {
              item.checked = true;
              ids.push(item.getAttribute("value"));
            });
          } else {
            ids = [];
            inputs.forEach((item) => {
              item.checked = false;
            });
          }

          text.value = ids;
        });

        inputs.forEach((item) => {
          item.addEventListener("change", () => {
            if (item.checked) {
              ids.push(item.getAttribute("value"));
            } else {
              ids = ids.filter(
                (element) => element !== item.getAttribute("value")
              );
            }

            const inputChecks = document.querySelectorAll(
              "tbody input[type='checkbox']:checked"
            );

            if (inputChecks.length === inputs.length) {
              checkAll.checked = true;
            } else {
              checkAll.checked = false;
            }
            text.value = ids;
          });
        });
      } else {
        const inputChecks = document.querySelectorAll(
          "tbody input[type='checkbox']:checked"
        );
        inputChecks.forEach((item) => {
          const tr = item.closest("tr");
          const position = tr.querySelector("input[type='text']").value;
          const id = item.getAttribute("value");

          ids.push(`${id}-${position}`);
          text.value = ids;
        });
      }
      return value;
    }
  }
}

function submitForm() {
  checkInput();
  const formChangeMulti = document.querySelector("[form-change-multi]");

  if(formChangeMulti){

    formChangeMulti.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const value = checkInput();
      setValueOption(value);
    });
  }
}

function setValueOption(value) {
  switch (value) {
    case "active":
      sendValue("Bạn có muốn thay đổi sang trạng thái hoạt động");

      break;
    case "inactive":
      sendValue("Bạn có muốn thay đổi sang trạng thái dừng hoạt động");

      break;
    case "delete-many":
      sendValue("Bạn có muốn xóa nhiều sản phẩm");
      break;
    case "change-position":
      sendValue("Bạn có muốn thay đổi vị trí nhiều sản phẩm");
      break;
    default:
      break;
  }
}

function sendValue(text) {
  const isDelete = confirm(text);
  if (isDelete) {
    const formChangeMulti = document.querySelector("[form-change-multi]");

    const path = formChangeMulti.getAttribute("data-path");
    formChangeMulti.action = path;
    formChangeMulti.submit();
  }
}

submitForm();

// End Change Many

// Xóa 1 sản phẩm
const buttonDeletes = document.querySelectorAll("[button-delete-product]");
const formDelete = document.querySelector("#form-delete-item");
console.log(formDelete)
if (buttonDeletes) {
  buttonDeletes.forEach((item) => {
    item.addEventListener("click", () => {
      const isDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này");
      if (isDelete) {
        const id = item.getAttribute("id");
        const action =
          formDelete.getAttribute("data-path") + `/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}

// End Xóa 1 sản phẩm

// Thêm mới sản phẩm
const formCreate = document.querySelector("[form-create-product]");
if (formCreate) {
  const path = formCreate.getAttribute("data-path");

  formCreate.action = path + "?_method=GET";
  console.log(formCreate.action);
  // formCreate.submit();
}

// End Thêm mới sản phẩm








