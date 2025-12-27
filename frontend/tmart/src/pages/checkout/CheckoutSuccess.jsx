import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./Checkout.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function CheckoutSuccess() {
  const location = useLocation();
  console.log(location);
  const [order, setOrder] = useState({
    products: [],
    userInfo: {},
    totalPrice: 0
  });
  useEffect(() => {
    if (location.state) {
        const totalPrice = location.state.products.reduce((total,item) => {
            return item.quantity * item.price + total
        },0);
      setOrder({
        products: location.state.products,
        userInfo: location.state.userInfo,
        totalPrice
      });
    }
  }, [location.state]);
  return (
    <>
      <div className="checkout-success">
        <Container>
          <Row>
            <Col>
              <h1 className="text-success">Đặt hàng thành công!</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="alert alert-success">
                Bạn đã đặt hàng thành công.Chúng tôi sẽ xử lý đơn hàng trong
                thời gian ngắn nhất
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Thông tin cá nhân</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="infor-user">
                <thead>
                  <tr>
                    <th>
                      <span>Họ tên</span>
                    </th>
                    <th>
                      <span>{order.userInfo.fullName}</span>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <span>Số điện thoại</span>
                    </th>
                    <th>
                      <span>{order.userInfo.phone}</span>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <span>Địa chỉ</span>
                    </th>
                    <th>
                      <span>{order.userInfo.address}</span>
                    </th>
                  </tr>
                </thead>
              </table>
            </Col>
          </Row>
          <Row>
            <h2>Thông tin đơn hàng</h2>
          </Row>
          <Row>
            <Col>
              <table className="infor-products">
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
                  {order.products &&
                    order.products.map((item, index) => {
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
                            <span>{item.quantity * item.price}$</span>
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
              <h2 className="totalPrice">
                Tổng đơn hàng: <span className="text-success">{order.totalPrice}$</span>
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
