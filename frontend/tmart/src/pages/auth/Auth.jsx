import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router";
import "./Auth.css";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import { FaBook, FaBookOpen } from "react-icons/fa";

export default function Auth() {
  const [render, setRender] = useState(true);
  const handleShowAuth = (isLogin) => {
    setRender(isLogin);
  };

  return (
    <>
      <div className="auth-wrapper">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div className="auth-container">
                {/* Header với icon sách */}
                <div className="auth-header-section">
                  <div className="book-icon-wrapper">
                    <FaBook className="book-icon" />
                  </div>
                  <h2 className="auth-title">Chào mừng đến với BookStore</h2>
                  <p className="auth-subtitle">Đăng nhập hoặc tạo tài khoản để khám phá thế giới sách</p>
                </div>

                {/* Tabs */}
                <div className="auth-tabs">
                  <button
                    className={`auth-tab ${render ? "active" : ""}`}
                    onClick={() => handleShowAuth(true)}
                  >
                    <FaBookOpen className="tab-icon" />
                    Đăng nhập
                  </button>
                  <button
                    className={`auth-tab ${!render ? "active" : ""}`}
                    onClick={() => handleShowAuth(false)}
                  >
                    <FaBook className="tab-icon" />
                    Đăng ký
                  </button>
                </div>

                {/* Form Content */}
                <div className="auth-content">
                  {render && <Login />}
                  {!render && <Register />}
                </div>

                {/* Footer */}
                <div className="auth-footer">
                  <p>
                    Bằng việc đăng nhập/đăng ký, bạn đồng ý với{" "}
                    <Link to="/">Điều khoản sử dụng</Link> và{" "}
                    <Link to="/">Chính sách bảo mật</Link> của chúng tôi.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
