import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "./forgotPassword.css";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { useNavigate } from "react-router";
import { Alert } from "antd";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const [textEmail, setTextEmail] = useState();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[type='email']").value;
    try {
      const response = await apiService.postForgotPassWord(email);

      if (response.data.code === 200) {
        navigate("/forgot-password/otp", {
          state: response.data.email,
        });
      } else {
        setShowAlert(true);
        setAlert({
          message: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
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
      <div className="forgot-password">
        <Container>
          <Row>
            <Col sm={12}>
              <h1 className="text-center">Nhập email lấy lại mật khẩu</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <form onSubmit={handleSubmitForm}>
                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={(e) => setTextEmail(e.target.value)}
                  />
                  {textEmail === "" && (
                    <p className="text-danger">Email không được để trống</p>
                  )}
                </div>
                <button
                  className="btn btn-success form-control"
                  type="submit"
                  disabled={textEmail !== "" ? false : true}
                >
                  Gửi
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
