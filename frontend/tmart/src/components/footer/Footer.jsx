import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";
import { MdHighQuality } from "react-icons/md";
import { SiLeaderprice } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
function Footer({data}) {
  return (
    <>
      <div className="footer">
        <Container>
          <h3 className="mt-md-4">Bản tin BookStore</h3>
          <Row>
            <Col className="p-0">
              <div className="quality">
                <MdHighQuality className="text-danger icon" />
                <p className="desc">Chất lượng sách</p>
              </div>
            </Col>
            <Col className="p-0">
              <div className="price">
                <SiLeaderprice className="text-success icon" />
                <p className="desc">Giá cả cạnh tranh</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} xl={6}>
              <div className="support">
                <FaPhoneAlt className="icon" />
                <p className="desc">
                  Hỗ trợ: 089 939 6446 (8:00 - 17h30, Thứ 2 - Thứ 6)
                </p>
              </div>
            </Col>
            <Col lg={12} xl={6}>
              <div className="store">
                <FaStore className="icon" />
                <p className="desc">Hệ thống cửa hàng BookStore</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={6}>
              <ul className="text-primary">
                <li>Liên hệ</li>
                <li>Tuyển dụng</li>
                <li>Giới Thiệu</li>
                <li>Chính sách khách hàng</li>
                <li>Hướng dẫn mua hàng</li>
              </ul>
            </Col>
            <Col md={4} sm={6}>
              <ul className="text-primary">
                <li>Hỏi đáp</li>
                <li>Chính sách bảo mật </li>
                <li>Chính sách giao hàng</li>
                <li>Chính sách đổi trả</li>
                <li>Điều khoản sử dụng</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="contact">
          <Container>
            <Row>
              <p className="font-weight-bold">{data.websiteName}</p>
              <p>GPKD số 0103973610</p>
              <p>
                {data.address}
              </p>
              <p>{data.copyright}</p>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Footer;
