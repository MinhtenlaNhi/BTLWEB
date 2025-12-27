// Thay đổi số lượng sản phẩm trong giỏ hàng
const cartQuantitys = document.querySelectorAll("[cart-quantity]");
if (cartQuantitys) {
  cartQuantitys.forEach((item) => {
    item.addEventListener("change", (e) => {
      const quantity = Number(item.value);
      if (quantity > 0) {
        const idProduct = e.target.getAttribute("id");
        const url = `/cart/update/${idProduct}/${quantity}`;
        window.location.href = url;
      }
    });
  });
}

// End Thay đổi số lượng sản phẩm trong giỏ hàng
