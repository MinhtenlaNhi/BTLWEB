module.exports = () => {
  let optionSorts = [
    {
      value: "desc-position",
      name: "Vị trí giảm dần",
    },
    {
      value: "asc-position",
      name: "Vị trí tăng dần",
    },
    {
      value: "desc-price",
      name: "Giá giảm dần",
    },
    {
      value: "asc-price",
      name: "Giá tăng dần",
    },
    {
      value: "asc-title",
      name: "Tiêu đề A-Z",
    },
    {
      value: "desc-title",
      name: "Tiêu đề Z-A",
    },
  ];

  let optionActions = [
    {
      value: "active",
      name: "Hoạt động",
    },
    {
      value: "inactive",
      name: "Dừng hoạt động",
    },
    {
      value: "delete-many",
      name: "Xóa nhiều",
    },
    {
      value: "change-position",
      name: "Thay đổi vị trí",
    },
  ];

  return {
    optionSorts,
    optionActions,
  };
};
