// Edit Permission
const tableRole = document.querySelector("[table-role]");

if (tableRole) {
  const buttonSubmit = document.querySelector("[button-change-permission]");

  buttonSubmit.addEventListener("click", (e) => {
    const rows = tableRole.querySelectorAll("tr[data-name]");

    let permissions = [];
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      if (name === "id") {
        const ids = row.querySelectorAll("th[id]");
        ids.forEach((item) => {
          permissions.push({
            id: item.getAttribute("id"),
            permissions: [],
          });
        });
      } else {
        const inputs = row.querySelectorAll("input[type='checkbox']");
        inputs.forEach((input, index) => {
          if (input.checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    const formChangePermission = document.querySelector(
      "#form-change-permission"
    );
    const textPermission =
      formChangePermission.querySelector("input[type='text']");
        textPermission.value = JSON.stringify(permissions);
        console.log(textPermission.value)
        formChangePermission.submit();
  });
}


// End Edit Permission

// Display Permission
const rows = document.querySelectorAll("tbody tr[data-name]");
if(rows){
  const permissions= document.querySelector("[data-permission]");
  if(permissions){
    const dataPermission = JSON.parse(permissions.getAttribute("data-permission"));
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input[type='checkbox']");
      inputs.forEach((_,index) => {
        if(dataPermission[index].permissions.includes(name)){
            inputs[index].checked = true;
          }
      })
    })
  }
}

// End Display Permission


// Delete
const buttonDeletes = document.querySelectorAll("[button-delete-role]");
const formDelete = document.querySelector("#form-delete-item");
console.log(formDelete)
if (buttonDeletes) {
  buttonDeletes.forEach((item) => {
    item.addEventListener("click", () => {
      const isDelete = confirm("Bạn có chắc chắn muốn xóa nhóm quyền này");
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

// End Delete