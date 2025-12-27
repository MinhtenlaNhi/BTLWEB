import "./ModalAddCart.css";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { Link } from "react-router";

export default function ModalAddCart({ isShow, handleModal, refSlug,cart }) {
  const [productModal, setProductModal] = useState([]);

  useEffect(() => {
    try {
      const fetchApi = async () => {
        const response = await apiService.getDetailProduct(refSlug);
        setProductModal(response.data.product);
      };

      fetchApi();
    } catch (error) {
      console.log(error);
    }
  }, [refSlug]);

  const handleCloseModal = () => {
    handleModal();
  };
  return (
    <>
      {productModal && (
        <div className={isShow ? "box-modal show" : "box-modal hidden"}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <TiTick className="icon-tick" />
                <p className="modal-title">Thêm vào giỏ hàng thành công!</p>
                <button className="close-modal" onClick={handleCloseModal}>
                  x
                </button>
              </div>
              <div className="modal-body">
                <div className="inner-product">
                  <div className="inner-image">
                    <img src={productModal.thumbnail} />
                  </div>
                  <div className="inner-desc">
                    <p className="inner-title">
                      {productModal.title}
                    </p>
                  </div>
                </div>
                <div className="cart-info">
                  <p className="inner-title">Giỏ hàng hiện có</p>
                  <div className="cart-detail">
                    <span className="inner-price">({cart.totalPrice.toFixed(2)})₫</span>
                    <span className="inner-quantity">({cart.totalQuantity}) sách</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link to="/">Thanh toán</Link>
                <Link to="/cart">Xem giỏ hàng</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
