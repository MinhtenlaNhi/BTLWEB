import Row from "react-bootstrap/esm/Col";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import "./Checkout.css";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { useCookies } from "react-cookie";
import { Alert } from "antd";
import { useNavigate } from "react-router";
export default function Checkout() {
    const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
  });
  const [data, setData] = useState({
    cart: [],
    totalPrice: 0,
  });
  const [cookies, _] = useCookies();
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
        console.log(response.data);
        if (response.data.code === 200) {
          const totalPrice = response.data.cart.reduce((total, item) => {
            return item.quantity * item.price + total;
          }, 0);
          setData({
            cart: response.data.cart,
            totalPrice,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [cookies.cartId]);
  console.log(cookies);
  const handleSubmitOrder = async(e) => {
    e.preventDefault();
    const fullName = e.target.querySelector("input[name='fullName']").value;
    const phone = e.target.querySelector("input[name='phone']").value;
    const address = e.target.querySelector("input[name='address']").value;
    if (fullName === "" || phone === "" || address === "") {
      setShowAlert(true);
      setAlert({
        message: "Không được để trống thông tin",
      });
    } else {
      const inforUser = {
        fullName,
        phone,
        address,
      };
      const response = await apiService.postAddOrder(cookies.cartId,inforUser,cookies.tokenUser);
      if(response.data.code === 200){
        navigate("/checkout/success",{
            state: response.data.order
        });
      }
    }
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
      <div className="checkout">
        <Container>
          <Row>
            <Col>
              <h1 className="text-success">Đặt hàng</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {data.cart &&
                    data.cart.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="image">
                              <img src={item.thumbnail} />
                            </div>
                          </td>
                          <td>
                            <span>{item.title}</span>
                          </td>
                          <td>
                            <span>{item.price}$</span>
                          </td>
                          <td>
                            <span>{item.quantity}</span>
                          </td>
                          <td>
                            <span>
                              {(item.price * item.quantity).toFixed(2)}$
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>
                Tổng đơn hàng:{" "}
                <span className="text-success">{data.totalPrice.toFixed(2)}$</span>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <form onSubmit={handleSubmitOrder}>
                <div className="form-group">
                  <label>Họ tên</label>
                  <input name="fullName" className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input name="phone" className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input name="address" className="form-control" type="text" />
                </div>
                <button type="submit" className="btn btn-success form-control">
                  Đặt hàng
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
