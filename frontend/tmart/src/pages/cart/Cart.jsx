import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { FaChevronDown } from "react-icons/fa";
import MainTitle from "@/components/mainTitle";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { remove, update } from "../../actions/cart";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { Alert } from "antd";
function Cart() {
  const navigate = useNavigate();
  const textTitle = "Giỏ hàng";
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const [cookies, setCookies] = useCookies();
  const [carts, setCart] = useState({
    cart: [],
    totalPrice: 0,
  });
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apiService.getCart(cookies.cartId);
        const listCart = response.data.cart;
        console.log(listCart);
        if (response.data.code === 200 && listCart) {
          const totalPrice = listCart.reduce((total, item) => {
            return Number(item.price) * Number(item.quantity) + total;
          }, 0);
          setCart({
            cart: listCart,
            totalPrice,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [cookies.cartId]);
  const handleAddProduct = (productId) => {
    try {
      const fetchApi = async () => {
        const response = await apiService.postAddCart(
          cookies.cartId,
          productId
        );
        if (response.data.code === 200) {
          setShowAlert(true);
          setAlert({
            message: response.data.message,
            type: "success",
          });
          const listCart = response.data.cart;
          console.log(listCart);
          const totalPrice = listCart.reduce((total, item) => {
            return Number(item.price) * Number(item.quantity) + total;
          }, 0);
          setCart({
            cart: listCart,
            totalPrice,
          });
        } else {
          setShowAlert(true);
          setAlert({
            message: response.data.message,
            type: "error",
          });
        }
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubProduct = (productId) => {
    try {
      const fetchApi = async () => {
        const response = await apiService.postDeleteCart(
          cookies.cartId,
          productId
        );
        if (response.data.code === 200) {
          setShowAlert(true);
          setAlert({
            message: response.data.message,
            type: "success",
          });
          const listCart = response.data.cart;
          console.log(listCart);
          const totalPrice = listCart.reduce((total, item) => {
            return Number(item.price) * Number(item.quantity) + total;
          }, 0);
          setCart({
            cart: listCart,
            totalPrice,
          });
        }
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = (productId) => {
    try {
      const fetchApi = async () => {
        const response = await apiService.postRemoveCart(
          cookies.cartId,
          productId
        );
        if (response.data.code === 200) {
          setShowAlert(true);
          setAlert({
            message: response.data.message,
            type: "success",
          });
          const listCart = response.data.cart;
          console.log(listCart);
          const totalPrice = listCart.reduce((total, item) => {
            return Number(item.price) * Number(item.quantity) + total;
          }, 0);
          setCart({
            cart: listCart,
            totalPrice,
          });
        }
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrder = () => {
    if (cookies.tokenUser) {
      navigate("/checkout");
    } else {
      navigate("/auth");
    }
  };
  return (
    <>
      {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          className="box-alert"
        />
      )}
      <MainTitle textTitle={textTitle} />
      <div className="cart-category">
        <Container>
          <Row>
            <h3 className="text-success">Giỏ hàng</h3>
          </Row>
          <Row>
            <Col className="pl-0" xl={8}>
              {carts.cart && carts.cart.length > 0 ? (
                <table>
                  <tbody>
                    {carts.cart.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <button
                              onClick={() =>
                                handleRemoveProduct(item.product_id)
                              }
                            >
                              x
                            </button>
                          </td>
                          <td>
                            <Link to={`/detail-product/${item.slug}`}>
                              <img src={item.thumbnail} alt="Ảnh" />
                            </Link>
                          </td>
                          <td>
                            <span className="name">{item.title}</span>
                          </td>
                          <td>
                            <span className="mr-3 price">{item.price}</span>
                          </td>
                          <td>
                            <div className="quantity">
                              <div className="change-quantity">
                                <button
                                  className="sub"
                                  onClick={() =>
                                    handleSubProduct(item.product_id)
                                  }
                                >
                                  -
                                </button>
                                <span className="value">{item.quantity}</span>
                                <button
                                  className="add"
                                  onClick={() =>
                                    handleAddProduct(item.product_id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h1>Giỏ hàng trống</h1>
              )}

              <Row>
                <Col>
                  <div className="note">
                    <p>Ghi chú đơn hàng</p>
                    <input type="text" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={4} className="px-0">
              <div className="order mt-4">
                {/* <h3>HẸN GIỜ NHẬN HÀNG</h3>
                <div className="datetime">
                  <div className="date">
                    <span>Ngày nhận hàng</span>
                    <input type="date" />
                  </div>
                  <div className="time">
                    <span>Thời gian nhận hàng</span>
                    <select>
                      <option>8h00-10h00</option>
                      <option>10h00-12h00</option>
                      <option>13h00-17h00</option>
                    </select>
                  </div>
                </div> */}
                {/* <div className={showRef ? ("infor-company") : ("infor-company not-show")}>
                  <div className="bill">
                    <input type="checkbox" onChange={(e) => e.target.checked ? (setShow(true)) : (setShow(false))}/>
                    <p>Xuất hóa đơn công ty</p>
                  </div>
                  <div className="fill-infor">
                    <div className="name">
                      <span>Tên công ty</span>
                      <input type="text" placeholder="Tên công ty" />
                    </div>
                    <div className="name">
                      <span>Mã số thuế</span>
                      <input type="text" placeholder="Mã số thuế" />
                    </div>
                    <div className="name">
                      <span>Địa chỉ công ty</span>
                      <input type="text" placeholder="Nhập địa chỉ công ty(bao gồm: Phường/Xã,Quận/Huyện, Tỉnh/Thành phố nếu có)" />
                    </div>
                    <div className="name">
                      <span>Email nhận hóa đơn</span>
                      <input type="text" placeholder="Email nhận hóa đơn" />
                    </div>
                  </div>
                </div> */}
                <div className="total">
                  <h2>TỔNG CỘNG</h2>
                  <span>${carts.totalPrice.toFixed(2)}$</span>
                </div>
                <p>(Đã bao gồm VAT nếu có)</p>
                <button onClick={handleOrder}>Thanh toán</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Cart;
