import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import MainTitle from "@/components/mainTitle";
import anh_qr from "@/assets/image/anh_qr.png";
import "./Payment.css";
import { useEffect, useState, useContext, useRef } from "react";
import { apiService } from "../../services/apiService";

export default function PayMent() {
  const [setting, setSettings] = useState({});
  const textTitle = useRef("Hình thức thanh toán")
  useEffect(() => {
    const fetchApi = async () => {
      try{
        const response = await apiService.getSetting();
        setSettings(response.data.setting);
      }

      catch(error){
        console.log("Lỗi rồi nhé", error);
      }
    }
    fetchApi();
  },[])

  return (
    <>
      <MainTitle textTitle={textTitle.current}/>
      <div className="wrap-payment">
        <Container>
          <Row>
            <Col>
              <div className="payment">
                <h1>Hình thức thanh toán</h1>
                <p>
                  Khi mua hàng tại {setting.websiteName} quý khách có thể lựa chọn
                  các hình thức thanh toán sau:
                </p>
                <ol>
                  <li>
                    Thanh toán và nhận hàng tại trụ sở công ty {setting.address}
                  </li>
                  <li>Nhận hàng và thanh toán tại nhà.</li>
                  <li>
                    Chuyển khoản vào tài khoản cá nhân sau : (nếu quý khách là
                    cá nhân)
                  </li>
                </ol>
                <span>Mã QR</span>
                <div className="qr">
                  <img src={anh_qr} alt="Ảnh" />
                  <div className="">
                    <p>Ngân Hàng Quân Đội - MB</p>
                    <p>Võ Đình Khánh</p>
                    <p>Số TK: 9431072004</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
