import { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import ModalAddCart from "@/components/modalAddCart";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/actions/cart";
import useAddCart from "../../hooks/useAddCart";
import { useCookies } from "react-cookie";
import { apiService } from "../../services/apiService";
import { Alert } from "antd";
import {handleReRender} from "../../helpers/reRenderHelper";
import "./Product.css";

export default function ProductItem({ data }) {
  const [cart, setCart] = useState({
    totalQuantity: 0,
    totalPrice: 0,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
  });
  const [cookies, setCookies] = useCookies();
  const cartId = cookies.cartId;
  const refSlug = useRef();

  const [productItems, setProductItem] = useState([]);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setProductItem(data);
  }, [data]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleAddCart = async (slug, id) => {
    try {
      const response = await apiService.postAddCart(cartId, id);
      if (response.data.code === 200) {
        console.log(response.data.cart);
        refSlug.current = slug;
        setIsShow(true);
        handleReRender(cartId,setCart);
      } else {
        setShowAlert(true);
        setAlert({
          message: "Thêm sách vào giỏ hàng không thành công!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleModal = () => {
    setIsShow(false);
  };
  return (
    <>
      {showAlert && (
        <Alert
          message={alert.message}
          type="error"
          showIcon
          closable
          className="box-alert"
        />
      )}
      <div className="product-item">
        {productItems.length > 0
          ? data.map((item, index) => {
              return (
                <div className={`item `} key={index} id={item._id}>
                  <Link to={`/detail-product/${item.slug}`}>
                    <img src={item.thumbnail} alt="Ảnh" />
                    <h3
                      className="name"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </Link>
                  <h3 className="price">{item.price}$</h3>
                  <h3 className="price-discount">
                    {(item.price - item.discountPercentage).toFixed(2)}$
                  </h3>
                  <span className="discount-percent">
                    -{item?.discountPercentage}%
                  </span>
                  <IoAdd
                    className="icon"
                    onClick={() => handleAddCart(item.slug, item._id)}
                  />
                </div>
              );
            })
          : "Không có sách nào"}
      </div>
      <ModalAddCart
        isShow={isShow}
        handleModal={handleModal}
        refSlug={refSlug.current}
        cart={cart}
        
      />
    </>
  );
}
