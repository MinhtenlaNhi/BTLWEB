import { apiService } from "../services/apiService";

export const handleReRender = async(cartId,setCart) => {
    const response = await apiService.getCart(cartId);
    if(response.data.code === 200){
      const listCart = response.data.cart;
      const totalQuantity = listCart.reduce((total, item) => {
        return item.quantity + total;
      }, 0);
      const totalPrice = listCart.reduce((total, item) => {
        return item.quantity * item.price + total;
      }, 0);
      setCart({
        totalPrice,
        totalQuantity,
      });
    }
  }