import anh_2 from "../../assets/image/anh_2.png";
import anh_3 from "../../assets/image/anh_3.webp";
import anh_4 from "../../assets/image/anh_4.webp";
import anh_5 from "../../assets/image/anh_5.jpg";
import { Link } from "react-router";
import { GrNext } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./home.css";
import TitleMenu from "@/components/titleMenu";
import Menu from "@/components/menu";
import MainSupport from "@/components/mainSupport";
import FeatureProduct from "../product/FeatureProduct";
import Fashion from "@/components/fashion";
import Phone from "@/components/phone";
import Laptop from "@/components/laptop";
import { useEffect, useState } from "react";
import { Alert } from "antd";
import { useCookies } from "react-cookie";
import { apiService } from "../../services/apiService";

export default function Home() {
  const justLogin = sessionStorage.getItem("justLogin");
  const [cookies, setCookies] = useCookies();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
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
    if (cookies.tokenUser && justLogin) {
      sessionStorage.removeItem("justLogin");
      setShowAlert(true);
      setAlert({
        message: "Đăng nhập thành công!",
      });
    }
  }, [cookies.tokenUser, justLogin]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (!cookies.cartId) {
          const response = await apiService.createCart();
          if (response.data.code === 200 && response.data.cartId) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 365);
            setCookies("cartId", response.data.cartId, {
              expires: expirationDate,
              path: "/",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [setCookies, cookies.cartId]);
  console.log(cookies);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      {showAlert && (
        <Alert
          message={alert.message}
          type="success"
          showIcon
          closable
          className="box-alert"
        />
      )}
      <div className="home">
        <Container>
          <Row>
            <Col xs={3} className="pr-0 d-none d-lg-block">
              <div className="list-category">
                <TitleMenu />
                <Menu />
                <Link to="/products">Xem thêm</Link>
              </div>
            </Col>
            <Col xs={9} className="">
              <MainSupport />
              <div className="adv mt-3">
                <Row>
                  <Col xl={8} lg={8} sm={12}>
                    <div className="slider-wrapper d-md-block">
                      <div className="left">
                        <Slider {...settings}>
                          <div className="item-image">
                            <img src={anh_4} alt="Ảnh" />
                          </div>
                          <div className="item-image">
                            <img src={anh_2} alt="Ảnh" />
                          </div>
                          <div className="item-image">
                            <img src={anh_3} alt="Ảnh" />
                          </div>
                          <div className="item-image">
                            <img src={anh_4} alt="Ảnh" />
                          </div>
                          <div className="item-image">
                            <img src={anh_5} alt="Ảnh" />
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </Col>
                  <Col
                    xl={4}
                    lg={4}
                    className="px-0 d-sm-none d-none d-lg-block"
                  >
                    <div className="right">
                      <img src={anh_2} alt="Ảnh" />
                    </div>
                    <div className="right">
                      <img src={anh_3} alt="Ảnh" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className="footer d-sm-none d-none d-lg-flex">
                    <Col xl={4} lg={4} className="pr-0">
                      <div className="">
                        <img src={anh_3} alt="Ảnh" />
                      </div>
                    </Col>
                    <Col xl={4} lg={4} className="pr-0">
                      <div className="">
                        <img src={anh_4} alt="Ảnh" />
                      </div>
                    </Col>
                    <Col xl={4} lg={4} className="pr-0">
                      <div className="">
                        <img src={anh_5} alt="Ảnh" />
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
          <h2 className="top mt-5">Top 10 sách bán chạy nhất</h2>
          <Row className="mt-5">
            <div className="wrapper">
              <FeatureProduct />
            </div>
          </Row>
          <Row>
            <h2 className="mt-5 mb-3">Văn học</h2>
            <Fashion />
            <div className="text-center">
              <div className="more">
                <button>Xem tất cả</button>
                <GrNext className="icon" />
              </div>
            </div>
          </Row>
          <Row>
            <h2 className="mt-5 mb-3">Khoa học - Kỹ thuật</h2>
            <Phone />
            <div className="text-center">
              <div className="more">
                <button>Xem tất cả</button>
                <GrNext className="icon" />
              </div>
            </div>
          </Row>
          <Row>
            <h2 className="mt-5 mb-3">Kinh tế - Quản trị</h2>
            <Laptop />
            <div className="text-center">
              <div className="more">
                <button>Xem tất cả</button>
                <GrNext className="icon" />
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
