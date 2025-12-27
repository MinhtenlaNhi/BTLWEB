// Lọc

const statusButtons = document.querySelectorAll("[button-status]");

if (statusButtons) {
  statusButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const status = item.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url;
    });
  });
}

// End Lọc

// Tim kiếm
const formSearch = document.querySelector("[form-search]");

if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputSearch = formSearch.querySelector("input[type='text']");
    const url = new URL(window.location.href);
    const keyword = inputSearch.value;
    if (inputSearch.value) {
      url.searchParams.set("keyword", keyword);
      window.location.href = url;
    }
  });
}
// End Tim kiếm

// Xóa tìm kiếm
const buttonDelete = document.querySelector("[button-delete]");
if (buttonDelete) {
  buttonDelete.addEventListener("click", () => {
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get("keyword");
    if (keyword) {
      const inputSearch = formSearch.querySelector("input[type='text']");
      inputSearch.value = "";
      url.searchParams.delete("keyword");
      window.location.href = url;
    }
  });
}

//End Xóa tìm kiếm

// Phân trang

const buttonPages = document.querySelectorAll(".pagination li");
console.log(buttonPages);

if (buttonPages) {
  buttonPages.forEach((item) => {
    item.addEventListener("click", () => {
      const buttonPage = item.getAttribute("button-page");
      const url = new URL(window.location.href);
      const page = url.searchParams.get("page");
      url.searchParams.set("page", buttonPage);
      window.location.href = url;
    });
  });
}

// End phân trang

// Show alert
const messageAlert = document.querySelector(".message-info");
if (messageAlert) {
  const alert = messageAlert.childNodes[0];
  const time = Number(alert.getAttribute("time-alert"));
  
  setTimeout(() => {
    messageAlert.classList.add("hidden");
  }, time);

}

// End Show Elert

// Sap xep
const selectSort = document.querySelector("[selection-sort]");
if (selectSort) {
  selectSort.addEventListener("change", (e) => {
    const url = new URL(window.location.href);
    const sortBy = e.target.value.split("-")[0];
    const sortValue = e.target.value.split("-")[1];
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url;
  });
}

// End Sap xep

// Xóa sắp xếp
const buttonDeleteSorted = document.querySelector("[delete-sorted]");
if (buttonDeleteSorted) {
  buttonDeleteSorted.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("sortBy");
    url.searchParams.delete("sortValue");
    window.location.href = url;
  });
}
// End Xóa sắp xếp


// Preview image
const inputImage = document.querySelector("[upload-image-input]");
if(inputImage) {
  inputImage.addEventListener("change",() => {
    const [file] = inputImage.files
    if (file) {
      const thumbnail = document.querySelector("#thumbnail-preview")
      thumbnail.src = URL.createObjectURL(file)
    }
  })
}

// End Preview image