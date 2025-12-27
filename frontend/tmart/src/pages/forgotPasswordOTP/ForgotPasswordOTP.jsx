import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../services/apiService";
import { useCookies } from "react-cookie";
import { Alert } from "antd";

export default function ForgotPasswordOTP() {
  const [cookies,setCookies] = useCookies();
  const navigate = useNavigate();
  const [textOTP, setTextOTP] = useState();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(179);
  const emailRef = useRef();
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
  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmitForm = async(e) => {
    e.preventDefault();
    try{
      const response = await apiService.postOTP(emailRef.current.value,textOTP);
      console.log(response.data);
      if(response.data.code === 400){
        setShowAlert(true);
        setAlert({
          message: response.data.message
        })
      }
      else{
        setCookies("tokenUser",response.data.tokenUser);
        navigate("/forgot-password/reset");
      }
    }
    catch(error){
      console.log(error);
    }
  };
  
  // gửi lại OTP
  const handleResendOTP = async() => {
    try{
      await apiService.postForgotPassWord(emailRef.current.value);
    }
    catch(error){
      console.log(error);
    }
  }

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
      <div className="otp">
        <Container>
          <Row>
            <Col sm={12}>
              <h1 className="text-center">Nhập mã xác thực OTP</h1>
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
                    readOnly
                    value={location.state}
                    ref={emailRef}
                  />
                </div>
                <div className="form-group">
                  <label>OTP</label>
                  <input
                    type="text"
                    placeholder="Nhập OTP"
                    onChange={(e) => setTextOTP(e.target.value)}
                    className="form-control"
                  />
                  {textOTP === "" && (
                    <p className="text-danger">OTP không được để trống</p>
                  )}
                </div>
                <button
                  className="btn btn-success form-control"
                  type="submit"
                  disabled={textOTP !== "" ? false : true}
                >
                  Gửi
                </button>
              </form>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {timeLeft !== 0 ? (
                <div className="expire-time">
                  <h2 className="desc-otp">Mã OTP sẽ hết hạn sau:</h2>
                  <div className="time">
                    <h2 className="text-danger">
                      {String(minutes).padStart(2, "0")}
                    </h2>
                    <h2 className="text-danger">:</h2>
                    <h2 className="text-danger">
                      {String(seconds).padStart(2, "0")}
                    </h2>
                  </div>

                  <h2>phút</h2>
                </div>
              ) : (
                <div className="resend-otp">
                  <button className="btn btn-primary" onClick={handleResendOTP}>Gửi lại mã OTP</button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
